
// Mock data configuration - easily editable without touching component code
export const DEMO_CREDENTIALS = {
  brand: {
    email: 'marca@xops.com',
    password: '123456'
  },
  client: {
    email: 'cliente@test.com',
    password: '123456'
  }
};

export const FEATURED_BRANDS = [
  { name: "Tlalli", category: "Artesanías", image: "/placeholder.svg" },
  { name: "Raíces", category: "Textiles", image: "/placeholder.svg" },
  { name: "Metales MX", category: "Joyería", image: "/placeholder.svg" },
  { name: "Pies de Barro", category: "Calzado", image: "/placeholder.svg" },
  { name: "Cacao Orgánico", category: "Alimentos", image: "/placeholder.svg" },
  { name: "Maderas Noble", category: "Muebles", image: "/placeholder.svg" },
];

export const SITE_CONFIG = {
  name: "Xops",
  tagline: "Descubre México una marca a la vez",
  description: "Conectamos contigo con las marcas mexicanas más auténticas y emergentes. Productos únicos, historias reales.",
  routes: {
    home: '/',
    login: '/login',
    adminLogin: '/admin/login',
    dashboard: '/dashboard',
    brands: '/brands',
    cart: '/cart',
    profile: '/profile'
  }
};
