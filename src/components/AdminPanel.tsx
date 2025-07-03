import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, Mail, MapPin, Calculator, FileText } from 'lucide-react';

interface Quote {
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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (isOpen) {
      const savedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
      setQuotes(savedQuotes.reverse()); // En yeni teklifler üstte
    }
  }, [isOpen]);

  const clearAllQuotes = () => {
    if (confirm('Tüm teklifleri silmek istediğinizden emin misiniz?')) {
      localStorage.removeItem('quotes');
      setQuotes([]);
    }
  };

  const deleteQuote = (index: number) => {
    if (confirm('Bu teklifi silmek istediğinizden emin misiniz?')) {
      const updatedQuotes = quotes.filter((_, i) => i !== index);
      setQuotes(updatedQuotes);
      localStorage.setItem('quotes', JSON.stringify(updatedQuotes.reverse()));
    }
  };

  const getServiceLabel = (value: string) => {
    const services = {
      'ic-mekan': 'İç Mekan Boyama',
      'badana': 'Badana'
    };
    return services[value as keyof typeof services] || value;
  };

  const getMaterialLabel = (value: string) => {
    const materials = {
      'malzemeli': 'Malzemeli',
      'malzemesiz': 'Malzemesiz'
    };
    return materials[value as keyof typeof materials] || value;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel - Teklif Talepleri</h2>
            <div className="flex items-center space-x-4">
              {quotes.length > 0 && (
                <button
                  onClick={clearAllQuotes}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Tümünü Sil
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Henüz teklif talebi bulunmuyor.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(quote.timestamp).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteQuote(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Sil
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800 border-b pb-1">Müşteri Bilgileri</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Ad Soyad:</span>
                          <span>{quote.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">
                            {quote.phone}
                          </a>
                        </div>
                        {quote.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                              {quote.email}
                            </a>
                          </div>
                        )}
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                          <span>{quote.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800 border-b pb-1">Hizmet Detayları</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Hizmet:</span> {getServiceLabel(quote.serviceType)}
                        </div>
                        <div>
                          <span className="font-medium">Oda Sayısı:</span> {quote.roomCount}
                        </div>
                        <div>
                          <span className="font-medium">Alan:</span> {quote.area} m²
                        </div>
                        <div>
                          <span className="font-medium">Malzeme:</span> {getMaterialLabel(quote.materialIncluded)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800 border-b pb-1">Fiyat & Açıklama</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calculator className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-600 text-lg">
                            {quote.estimatedPrice.toLocaleString('tr-TR')} TL
                          </span>
                        </div>
                        {quote.description && (
                          <div>
                            <span className="font-medium">Açıklama:</span>
                            <p className="mt-1 text-gray-600 bg-white p-2 rounded border">
                              {quote.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;