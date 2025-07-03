import React, { useState } from 'react';
import { X, Calculator, MapPin, Phone, Mail, Home, Ruler } from 'lucide-react';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuoteData {
  serviceType: string;
  roomCount: string;
  area: string;
  materialIncluded: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  estimatedPrice: number;
  timestamp: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    roomCount: '',
    area: '',
    materialIncluded: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    description: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const serviceTypes = [
    { value: 'ic-mekan', label: 'İç Mekan Boyama' },
    { value: 'badana', label: 'Badana' }
  ];

  const materialOptions = [
    { value: 'malzemeli', label: 'Malzemeli' },
    { value: 'malzemesiz', label: 'Malzemesiz' }
  ];

  const calculatePrice = () => {
    if (!formData.area || !formData.materialIncluded) return;

    const area = parseInt(formData.area);
    const roomCount = parseInt(formData.roomCount) || 1;
    
    // Metrekare başına 90 TL
    let basePrice = area * 90;
    
    // Malzemeli ise oda başına 1300 TL eklenir
    if (formData.materialIncluded === 'malzemeli') {
      basePrice += roomCount * 1300;
    }
    
    setEstimatedPrice(basePrice);
  };

  const saveQuoteToStorage = (quoteData: QuoteData) => {
    const existingQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    existingQuotes.push(quoteData);
    localStorage.setItem('quotes', JSON.stringify(existingQuotes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const quoteData: QuoteData = {
      ...formData,
      estimatedPrice: estimatedPrice || 0,
      timestamp: new Date().toISOString()
    };
    
    // Teklifi kaydet
    saveQuoteToStorage(quoteData);
    
    // WhatsApp'a yönlendir
    const message = encodeURIComponent(
      `Yeni Teklif Talebi:\n\n` +
      `Ad Soyad: ${formData.name}\n` +
      `Telefon: ${formData.phone}\n` +
      `Hizmet: ${serviceTypes.find(s => s.value === formData.serviceType)?.label}\n` +
      `Oda Sayısı: ${formData.roomCount}\n` +
      `Alan: ${formData.area} m²\n` +
      `Malzeme: ${materialOptions.find(m => m.value === formData.materialIncluded)?.label}\n` +
      `Adres: ${formData.address}\n` +
      `Tahmini Fiyat: ${estimatedPrice?.toLocaleString('tr-TR')} TL\n` +
      `Açıklama: ${formData.description}`
    );
    
    window.open(`https://wa.me/905327910849?text=${message}`, '_blank');
    
    alert('Teklif talebiniz WhatsApp üzerinden iletildi!');
    onClose();
  };

  React.useEffect(() => {
    calculatePrice();
  }, [formData.area, formData.materialIncluded, formData.roomCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ücretsiz Teklif Al</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hizmet Türü *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seçiniz</option>
                  {serviceTypes.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Sayısı *
                </label>
                <select
                  value={formData.roomCount}
                  onChange={(e) => setFormData({...formData, roomCount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seçiniz</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} Oda</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Boyama Alanı (m²) *
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Malzeme Durumu *
                </label>
                <select
                  value={formData.materialIncluded}
                  onChange={(e) => setFormData({...formData, materialIncluded: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seçiniz</option>
                  {materialOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {estimatedPrice && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Tahmini Fiyat</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {estimatedPrice.toLocaleString('tr-TR')} TL
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  *Kesin fiyat keşif sonrası belirlenecektir
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Adınız Soyadınız *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0XXX XXX XX XX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                E-posta Adresi
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Adres *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ankara/İlçe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ek Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Özel istekleriniz, renk tercihleri vb."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Teklif Talebini Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;