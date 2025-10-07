import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import ForYouSection from '@/components/home/ForYouSection';
import EventsSection from '@/components/home/EventsSection';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import Footer from '@/components/shared/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ForYouSection />
      <EventsSection />
      <FeaturedBrands />
      <Footer />
    </div>
  );
};

export default Index;
