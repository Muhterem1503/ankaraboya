import React from 'react';
import { Palette, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:05327910849';
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AnkaraBoya</h3>
                <p className="text-sm text-gray-400">Profesyonel Boya Hizmetleri</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Ankara'da 10 yılı aşkın tecrübemizle kaliteli boya hizmetleri sunuyoruz.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2 text-gray-400">
              <li>İç Mekan Boyama</li>
              <li>Badana Hizmetleri</li>
              <li>Boyama ve Onarım Hizmetleri</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3 text-gray-400">
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors"
                onClick={handlePhoneClick}
              >
                <Phone className="w-4 h-4" />
                <span>0532 791 08 49</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:muhterem1503@gmail.com" className="hover:text-white transition-colors">
                  muhterem1503@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Ankara, Türkiye</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>09:00 - 18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Sosyal Medya</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Güncel kampanyalarımızı takip edin!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AnkaraBoya. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;