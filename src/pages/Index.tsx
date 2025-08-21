
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import ForYouSection from '@/components/home/ForYouSection';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import Footer from '@/components/shared/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ForYouSection />
      <FeaturedBrands />
      <Footer />
    </div>
  );
};

export default Index;
