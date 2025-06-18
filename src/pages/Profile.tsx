
import Header from '@/components/Header';
import UserHeader from '@/components/profile/UserHeader';
import FavoriteProducts from '@/components/profile/FavoriteProducts';
import FollowedBrands from '@/components/profile/FollowedBrands';
import PersonalInfo from '@/components/profile/PersonalInfo';
import OrderHistory from '@/components/profile/OrderHistory';
import ProfileStats from '@/components/profile/ProfileStats';

const Profile = () => {
  const user = {
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "+52 55 1234 5678",
    address: "Av. Reforma 123, CDMX"
  };

  const recentOrders = [
    {
      id: "#001",
      date: "15 Ene 2024",
      status: "Entregado",
      total: 1350,
      items: 2,
      brand: "Tlalli"
    },
    {
      id: "#002",
      date: "10 Ene 2024",
      status: "En camino",
      total: 890,
      items: 1,
      brand: "Raíces"
    },
    {
      id: "#003",
      date: "5 Ene 2024",
      status: "Entregado",
      total: 2100,
      items: 3,
      brand: "Metales MX"
    }
  ];

  const followedBrands = [
    {
      id: 1,
      name: "Tlalli",
      category: "Artesanías",
      location: "Oaxaca",
      followers: 1248,
    },
    {
      id: 2,
      name: "Raíces",
      category: "Textiles", 
      location: "Yucatán",
      followers: 895,
    },
    {
      id: 3,
      name: "Metales MX",
      category: "Joyería",
      location: "Taxco",
      followers: 2130,
    },
    {
      id: 4,
      name: "Pies de Barro",
      category: "Calzado",
      location: "Michoacán",
      followers: 567,
    },
  ];

  const likedProducts = [
    {
      id: 1,
      name: "Bolsa Artesanal Oaxaca",
      brand: "Tlalli",
      price: 899,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Playera Bordada Yucatán",
      brand: "Raíces",
      price: 450,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Collar de Plata",
      brand: "Metales MX",
      price: 1250,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Huaraches Michoacán",
      brand: "Pies de Barro",
      price: 780,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Aretes de Jade",
      brand: "Metales MX",
      price: 650,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Reboso Tradicional",
      brand: "Raíces",
      price: 920,
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-xops-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserHeader user={user} />

        <div className="space-y-8">
          <FavoriteProducts products={likedProducts} />
          <FollowedBrands brands={followedBrands} />
          <PersonalInfo user={user} />
          <OrderHistory orders={recentOrders} />
          <ProfileStats 
            totalOrders={12}
            totalSpent={8450}
            followedBrandsCount={followedBrands.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
