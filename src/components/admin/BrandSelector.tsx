
import { Brand } from '@/types/admin';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BrandSelectorProps {
  currentBrand: Brand;
  brands: Brand[];
  onBrandChange: (brand: Brand) => void;
}

const BrandSelector = ({ currentBrand, brands, onBrandChange }: BrandSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-lg flex items-center justify-center">
        <img 
          src={currentBrand.logo} 
          alt={currentBrand.name}
          className="w-6 h-6 rounded"
        />
      </div>
      
      <Select 
        value={currentBrand.id} 
        onValueChange={(value) => {
          const brand = brands.find(b => b.id === value);
          if (brand) onBrandChange(brand);
        }}
      >
        <SelectTrigger className="w-[200px] border-0 shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>
              <div className="flex items-center gap-2">
                <img src={brand.logo} alt={brand.name} className="w-4 h-4 rounded" />
                {brand.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BrandSelector;
