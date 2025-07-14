import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Brand {
  id: number;
  name: string;
  category: string;
  location: string;
  followers: number;
  image?: string;
  logo?: string;
  description?: string;
  longDescription?: string;
  rating?: number;
  verified?: boolean;
}

interface BrandFollowContextType {
  followedBrands: Brand[];
  isFollowing: (brandId: number) => boolean;
  followBrand: (brand: Brand) => void;
  unfollowBrand: (brandId: number) => void;
  getFollowedBrandsCount: () => number;
}

const BrandFollowContext = createContext<BrandFollowContextType | null>(null);

export const useBrandFollow = () => {
  const context = useContext(BrandFollowContext);
  if (!context) {
    throw new Error('useBrandFollow must be used within a BrandFollowProvider');
  }
  return context;
};

// Mock brands data
export const MOCK_BRANDS: Brand[] = [
  {
    id: 1,
    name: "Tlalli",
    category: "Artesanías",
    location: "Oaxaca",
    followers: 1248,
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    description: "Artesanías auténticas de Oaxaca con técnicas ancestrales",
    longDescription: "Tlalli es una marca comprometida con preservar las técnicas artesanales ancestrales de Oaxaca. Trabajamos directamente con artesanas zapotecas, asegurando que cada pieza mantenga la autenticidad y calidad que nos caracteriza.",
    rating: 4.8,
    verified: true,
  },
  {
    id: 2,
    name: "Raíces",
    category: "Textiles",
    location: "Yucatán",
    followers: 895,
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    description: "Textiles tradicionales yucatecos con diseños contemporáneos",
    longDescription: "Marca dedicada a rescatar y modernizar los textiles tradicionales de Yucatán, trabajando con comunidades mayas para crear piezas únicas que honran nuestras raíces.",
    rating: 4.6,
    verified: true,
  },
  {
    id: 3,
    name: "Metales MX",
    category: "Joyería",
    location: "Taxco",
    followers: 2130,
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    description: "Joyería de plata mexicana con diseños únicos",
    longDescription: "Especialistas en joyería de plata 925 con más de 30 años de experiencia en Taxco. Cada pieza es única y refleja la tradición platería mexicana.",
    rating: 4.9,
    verified: true,
  },
  {
    id: 4,
    name: "Pies de Barro",
    category: "Calzado",
    location: "Michoacán",
    followers: 567,
    image: "/placeholder.svg",
    logo: "/placeholder.svg",
    description: "Calzado artesanal de cuero natural",
    longDescription: "Calzado 100% artesanal elaborado con cuero natural de la más alta calidad. Cada par es único y está hecho a mano por maestros zapateros michoacanos.",
    rating: 4.5,
    verified: false,
  },
];

export const BrandFollowProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with some followed brands
  const [followedBrands, setFollowedBrands] = useState<Brand[]>([
    MOCK_BRANDS[0], // Tlalli
    MOCK_BRANDS[1], // Raíces
    MOCK_BRANDS[2], // Metales MX
  ]);

  const isFollowing = (brandId: number): boolean => {
    return followedBrands.some(brand => brand.id === brandId);
  };

  const followBrand = (brand: Brand) => {
    setFollowedBrands(prev => {
      if (prev.some(b => b.id === brand.id)) {
        return prev; // Already following
      }
      return [...prev, brand];
    });
  };

  const unfollowBrand = (brandId: number) => {
    setFollowedBrands(prev => prev.filter(brand => brand.id !== brandId));
  };

  const getFollowedBrandsCount = (): number => {
    return followedBrands.length;
  };

  return (
    <BrandFollowContext.Provider value={{
      followedBrands,
      isFollowing,
      followBrand,
      unfollowBrand,
      getFollowedBrandsCount,
    }}>
      {children}
    </BrandFollowContext.Provider>
  );
};