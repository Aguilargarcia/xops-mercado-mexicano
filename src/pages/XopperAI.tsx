import Header from '@/components/Header';
import XopperAI from '@/components/home/XopperAI';
import Footer from '@/components/shared/Footer';

const XopperAIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-xops-dark mb-2">Xopper AI</h1>
          <p className="text-gray-600">Tu asistente de estilo personal para descubrir moda artesanal mexicana</p>
        </div>
        <XopperAI />
      </div>
      <Footer />
    </div>
  );
};

export default XopperAIPage;
