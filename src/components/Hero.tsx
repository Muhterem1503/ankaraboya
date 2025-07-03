import React from 'react';
import { ArrowRight, Star, CheckCircle, MessageCircle } from 'lucide-react';

interface HeroProps {
  onGetQuote: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetQuote }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Merhaba, boya işleri hakkında bilgi almak istiyorum.");
    window.open(`https://wa.me/905327910849?text=${message}`, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 Müşteri Memnuniyeti</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Ankara'nın En İyi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {' '}Boya Hizmetleri
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ev, işyeri ve iç mekan boyama işlerinde uzman ekibimizle kaliteli hizmet sunuyoruz. 
            Hemen ücretsiz teklif alın!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetQuote}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp'tan Ulaş</span>
            </button>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            ⚡ Hemen fiyat öğrenin - Kayıt gerektirmez
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">Ücretsiz Keşif</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">Garantili İşçilik</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">Hızlı Teslimat</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
};

export default Hero;