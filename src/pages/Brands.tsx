
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Brands = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const brands = [
    {
      id: 1,
      name: "Tlalli",
      description: "Artesanías auténticas de Oaxaca con técnicas ancestrales",
      category: "Artesanías",
      location: "Oaxaca",
      image: "/placeholder.svg",
      rating: 4.8,
      products: 24,
      verified: true,
    },
    {
      id: 2,
      name: "Raíces",
      description: "Textiles bordados a mano por artesanas yucatecas",
      category: "Textiles",
      location: "Yucatán",
      image: "/placeholder.svg",
      rating: 4.9,
      products: 18,
      verified: true,
    },
    {
      id: 3,
      name: "Metales MX",
      description: "Joyería de plata fina con diseños contemporáneos",
      category: "Joyería",
      location: "Taxco",
      image: "/placeholder.svg",
      rating: 4.7,
      products: 32,
      verified: true,
    },
    {
      id: 4,
      name: "Pies de Barro",
      description: "Calzado artesanal michoacano con cuero natural",
      category: "Calzado",
      location: "Michoacán",
      image: "/placeholder.svg",
      rating: 4.6,
      products: 15,
      verified: false,
    },
    {
      id: 5,
      name: "Sabores del Sur",
      description: "Productos gourmet y especias de Chiapas",
      category: "Alimentos",
      location: "Chiapas",
      image: "/placeholder.svg",
      rating: 4.5,
      products: 28,
      verified: true,
    },
    {
      id: 6,
      name: "Barro Noble",
      description: "Cerámica y talavera poblana tradicional",
      category: "Cerámica",
      location: "Puebla",
      image: "/placeholder.svg",
      rating: 4.8,
      products: 21,
      verified: true,
    },
  ];

  const categories = ['all', 'Artesanías', 'Textiles', 'Joyería', 'Calzado', 'Alimentos', 'Cerámica'];
  const locations = ['all', 'Oaxaca', 'Yucatán', 'Taxco', 'Michoacán', 'Chiapas', 'Puebla'];

  const filteredBrands = brands.filter(brand => {
    const categoryMatch = selectedCategory === 'all' || brand.category === selectedCategory;
    const locationMatch = selectedLocation === 'all' || brand.location === selectedLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-xops-blue to-xops-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-xops-dark mb-4">
            Marcas Mexicanas
          </h1>
          <p className="text-xl text-xops-dark/80 max-w-2xl mx-auto">
            Descubre historias únicas detrás de cada producto. Apoya el talento local.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-xops-dark" />
              <span className="font-medium text-xops-dark">Filtros:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Todas las categorías' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'Todas las ubicaciones' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-xops-dark">
              {filteredBrands.length} marcas encontradas
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <Card key={brand.id} className="card-hover overflow-hidden border-0 shadow-md">
                <div className="relative">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-48 object-cover"
                  />
                  {brand.verified && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Verificada
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-xops-dark">{brand.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{brand.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {brand.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{brand.location}</span>
                    </div>
                    <span>•</span>
                    <span>{brand.products} productos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-xops-cream text-xops-dark text-xs px-2 py-1 rounded-full">
                      {brand.category}
                    </span>
                  </div>
                  
                  <Button className="w-full mt-4 btn-primary">
                    Ver Productos
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
