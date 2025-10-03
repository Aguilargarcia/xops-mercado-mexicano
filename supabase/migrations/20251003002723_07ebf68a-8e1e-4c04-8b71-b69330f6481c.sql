-- Create enum for user roles
create type public.app_role as enum ('admin', 'brand');

-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  name text not null,
  user_type text not null check (user_type in ('cliente', 'marca')),
  brand_name text,
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Create security definer function for role checking
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10, 2) not null,
  images text[] not null default '{}',
  category text not null,
  stock integer not null default 0,
  qr_code text,
  brand_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.products enable row level security;

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- RLS Policies for user_roles
create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- RLS Policies for products
create policy "Anyone can view products"
  on public.products for select
  using (true);

create policy "Brand users can create their own products"
  on public.products for insert
  with check (auth.uid() = brand_id and public.has_role(auth.uid(), 'brand'));

create policy "Brand users can update their own products"
  on public.products for update
  using (auth.uid() = brand_id and public.has_role(auth.uid(), 'brand'));

create policy "Brand users can delete their own products"
  on public.products for delete
  using (auth.uid() = brand_id and public.has_role(auth.uid(), 'brand'));

create policy "Admins can manage all products"
  on public.products for all
  using (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, user_type, brand_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'user_type', 'cliente'),
    new.raw_user_meta_data->>'brand_name',
    new.raw_user_meta_data->>'phone'
  );
  
  -- Assign role based on user_type
  if (new.raw_user_meta_data->>'user_type' = 'marca') then
    insert into public.user_roles (user_id, role)
    values (new.id, 'brand');
  end if;
  
  return new;
end;
$$;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for timestamp updates
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at_column();