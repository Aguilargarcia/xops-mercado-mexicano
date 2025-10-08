export interface ProductData {
  id: number;
  name: string;
  brand: string;
  brandId: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isNew: boolean;
  features: string[];
  brandInfo: {
    name: string;
    location: string;
    verified: boolean;
    description: string;
  };
}

export const PRODUCTS: ProductData[] = [
  {
    id: 1,
    name: "Bolsa Artesanal Oaxaca",
    brand: "Tlalli",
    brandId: 1,
    price: 899,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 127,
    description: "Hermosa bolsa artesanal elaborada a mano por artesanas oaxaqueñas. Cada pieza es única y cuenta con bordados tradicionales que representan la rica cultura zapoteca. Hecha con materiales naturales y tintes orgánicos.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L"],
    inStock: true,
    stockCount: 8,
    isNew: true,
    features: [
      "Hecho a mano por artesanas oaxaqueñas",
      "Materiales 100% naturales",
      "Tintes orgánicos",
      "Bordados tradicionales zapotecos",
      "Pieza única e irrepetible"
    ],
    brandInfo: {
      name: "Tlalli",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Marca comprometida con preservar las técnicas artesanales ancestrales"
    }
  },
  {
    id: 2,
    name: "Collar de Jade",
    brand: "Tlalli",
    brandId: 1,
    price: 650,
    rating: 4.7,
    reviews: 89,
    description: "Elegante collar de jade auténtico con diseño tradicional mexicano. Cada piedra es cuidadosamente seleccionada y pulida a mano.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["Único"],
    inStock: true,
    stockCount: 15,
    isNew: false,
    features: [
      "Jade auténtico",
      "Pulido a mano",
      "Diseño tradicional",
      "Pieza única"
    ],
    brandInfo: {
      name: "Tlalli",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Marca comprometida con preservar las técnicas artesanales ancestrales"
    }
  },
  {
    id: 3,
    name: "Aretes de Plata",
    brand: "Tlalli",
    brandId: 1,
    price: 450,
    rating: 4.9,
    reviews: 156,
    description: "Hermosos aretes de plata 925 con diseños inspirados en la cultura zapoteca. Elaborados por maestros joyeros oaxaqueños.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["Único"],
    inStock: true,
    stockCount: 20,
    isNew: false,
    features: [
      "Plata 925",
      "Diseño zapoteco",
      "Hecho a mano",
      "Acabado premium"
    ],
    brandInfo: {
      name: "Tlalli",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Marca comprometida con preservar las técnicas artesanales ancestrales"
    }
  },
  {
    id: 4,
    name: "Pulsera Bordada",
    brand: "Tlalli",
    brandId: 1,
    price: 280,
    originalPrice: 380,
    rating: 4.6,
    reviews: 203,
    description: "Delicada pulsera bordada a mano con hilos de colores tradicionales. Perfecta para complementar cualquier outfit.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L"],
    inStock: true,
    stockCount: 25,
    isNew: true,
    features: [
      "Bordado a mano",
      "Hilos tradicionales",
      "Ajustable",
      "Diseño único"
    ],
    brandInfo: {
      name: "Tlalli",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Marca comprometida con preservar las técnicas artesanales ancestrales"
    }
  },
  {
    id: 101,
    name: "Camisa Artesanal de Algodón",
    brand: "Hilos Naturales",
    brandId: 2,
    price: 850,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 94,
    description: "Camisa de algodón 100% orgánico, tejida a mano con técnicas tradicionales. Diseño contemporáneo con raíces mexicanas.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 12,
    isNew: true,
    features: [
      "Algodón orgánico",
      "Tejido a mano",
      "Diseño contemporáneo",
      "Tintes naturales"
    ],
    brandInfo: {
      name: "Hilos Naturales",
      location: "Puebla, Puebla",
      verified: true,
      description: "Textiles artesanales con fibras 100% naturales"
    }
  },
  {
    id: 102,
    name: "Pantalón de Mezclilla Mexicana",
    brand: "Denim Ancestral",
    brandId: 3,
    price: 1200,
    rating: 4.6,
    reviews: 72,
    description: "Pantalón de mezclilla premium hecho en México con técnicas tradicionales de teñido índigo. Corte clásico y duradero.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    stockCount: 18,
    isNew: false,
    features: [
      "Mezclilla premium",
      "Teñido índigo tradicional",
      "Corte clásico",
      "Hecho en México"
    ],
    brandInfo: {
      name: "Denim Ancestral",
      location: "León, Guanajuato",
      verified: true,
      description: "Mezclilla de alta calidad con procesos tradicionales"
    }
  },
  {
    id: 103,
    name: "Guayabera Tradicional Yucateca",
    brand: "Raíces Mayas",
    brandId: 4,
    price: 950,
    originalPrice: 1300,
    rating: 4.9,
    reviews: 128,
    description: "Auténtica guayabera yucateca bordada a mano. Confeccionada con lino fino y bordados tradicionales mayas.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 10,
    isNew: true,
    features: [
      "Lino fino",
      "Bordado maya a mano",
      "Diseño tradicional",
      "Confección premium"
    ],
    brandInfo: {
      name: "Raíces Mayas",
      location: "Mérida, Yucatán",
      verified: true,
      description: "Guayaberas auténticas con bordados tradicionales mayas"
    }
  },
  {
    id: 104,
    name: "Chaleco de Cuero Oaxaqueño",
    brand: "Piel Ancestral",
    brandId: 5,
    price: 1800,
    rating: 4.7,
    reviews: 61,
    description: "Chaleco de cuero genuino trabajado por maestros talabarteros oaxaqueños. Diseño artesanal con grabados únicos.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 6,
    isNew: false,
    features: [
      "Cuero genuino",
      "Grabados a mano",
      "Confección artesanal",
      "Diseño único"
    ],
    brandInfo: {
      name: "Piel Ancestral",
      location: "Oaxaca de Juárez, Oaxaca",
      verified: true,
      description: "Talabartería tradicional oaxaqueña de alta calidad"
    }
  },
  {
    id: 105,
    name: "Polo de Fibra Natural",
    brand: "Eco Textil",
    brandId: 6,
    price: 650,
    originalPrice: 900,
    rating: 4.5,
    reviews: 112,
    description: "Polo elaborado con fibras naturales y procesos sustentables. Cómodo, fresco y amigable con el medio ambiente.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 22,
    isNew: false,
    features: [
      "Fibras naturales",
      "Proceso sustentable",
      "Transpirable",
      "Eco-friendly"
    ],
    brandInfo: {
      name: "Eco Textil",
      location: "Guadalajara, Jalisco",
      verified: true,
      description: "Textiles sustentables con fibras naturales mexicanas"
    }
  },
  {
    id: 106,
    name: "Suéter de Lana de Alpaca",
    brand: "Montaña Textil",
    brandId: 7,
    price: 1500,
    rating: 4.8,
    reviews: 87,
    description: "Suéter tejido a mano con lana de alpaca de alta calidad. Abrigador, suave y con diseños geométricos tradicionales.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 8,
    isNew: true,
    features: [
      "Lana de alpaca",
      "Tejido a mano",
      "Diseños geométricos",
      "Alta calidad"
    ],
    brandInfo: {
      name: "Montaña Textil",
      location: "San Cristóbal de las Casas, Chiapas",
      verified: true,
      description: "Textiles de alta montaña con lana de alpaca premium"
    }
  }
];

export const getProductById = (id: number): ProductData | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const getRelatedProducts = (productId: number, limit: number = 3): ProductData[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Get products from the same brand, excluding the current product
  const samebrands = PRODUCTS.filter(
    p => p.brandId === product.brandId && p.id !== productId
  );
  
  return samebrands.slice(0, limit);
};
