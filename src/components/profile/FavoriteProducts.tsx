
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface FavoriteProductsProps {
  products: Product[];
}

const FavoriteProducts = ({ products }: FavoriteProductsProps) => {
  return (
    <Card className="p-6 border-0 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-xops-dark">Productos Favoritos</h2>
        </div>
        <span className="text-lg font-medium text-xops-blue">{products.length} productos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <Link to={`/product/${product.id}`} className="font-semibold text-xops-dark hover:text-xops-blue line-clamp-2">
                {product.name}
              </Link>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <p className="text-lg font-light text-xops-blue">${product.price.toLocaleString()}</p>
            </div>
            <Button variant="outline" size="sm" className="self-start">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FavoriteProducts;
