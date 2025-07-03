import React from 'react';
import { Home, Brush, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "İç Mekan Boyama",
      description: "Ev ve ofis iç mekan boyama hizmetleri",
      color: "bg-blue-500"
    },
    {
      icon: <Brush className="w-8 h-8" />,
      title: "Badana Hizmetleri",
      description: "Duvar ve tavan badana işleri",
      color: "bg-purple-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hızlı Servis",
      description: "Boyama ve onarım hizmetleri",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ankara'da tüm boya işleri için profesyonel çözümler sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;