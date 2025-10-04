import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import ForYouSection from '@/components/home/ForYouSection';
import XopperAI from '@/components/home/XopperAI';
import EventsSection from '@/components/home/EventsSection';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import Footer from '@/components/shared/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('foryou');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Page Title - Tab Switcher */}
      <div className="bg-background border-b border-border sticky top-0 z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full sm:w-auto bg-muted h-14">
              <TabsTrigger value="foryou" className="flex-1 sm:flex-none text-2xl font-bold px-8">
                Para Ti
              </TabsTrigger>
              <TabsTrigger value="xopper" className="flex-1 sm:flex-none text-2xl font-bold px-8">
                Xopper AI
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'foryou' ? <ForYouSection /> : <XopperAI />}
      </div>

      {/* Show Events and Featured Brands only in For You mode */}
      {activeTab === 'foryou' && (
        <>
          <EventsSection />
          <FeaturedBrands />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
