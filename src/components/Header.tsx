import React, { useState } from 'react';
import { Menu, X, Palette, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePhoneClick = () => {
    window.location.href = 'tel:05327910849';
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AnkaraBoya</h1>
              <p className="text-sm text-gray-600">Profesyonel Boya Hizmetleri</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Ankara</span>
            </div>
            <div 
              className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handlePhoneClick}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">0532 791 08 49</span>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Ankara</span>
              </div>
              <div 
                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handlePhoneClick}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">0532 791 08 49</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Admin Login - Küçük ve dikkat çekmeyen */}
      <div className="absolute top-2 right-2">
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
          >
            Çıkış
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
          >
            Admin
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;