
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="gradient-hero py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-xops-dark mb-6">
          Descubre México
          <span className="block text-xops-blue">una marca a la vez</span>
        </h1>
        <p className="text-xl text-xops-dark/80 mb-8 max-w-2xl mx-auto">
          Conectamos contigo con las marcas mexicanas más auténticas y emergentes. 
          Productos únicos, historias reales.
        </p>
        <Button className="btn-primary text-lg px-8 py-4">
          Explorar Marcas
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
