import React, { useState, useRef } from 'react';

interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
}

const PropertyCarousel: React.FC = () => {
  const properties: Property[] = [
    {
      id: 'villa-1',
      title: 'فيلا فاخرة',
      description: 'فيلا حديثة بمساحة 500م² مع حديقة خاصة وحمام سباحة',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop'
    },
    {
      id: 'apt-1',
      title: 'شقة سكنية',
      description: 'شقة حديثة 3 غرف في برج سكني عصري مع جميع التسهيلات',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=800&fit=crop'
    },
    {
      id: 'mall-1',
      title: 'مول تجاري',
      description: 'مول متعدد الأدوار مع مساحات عرض حديثة وموقع استراتيجي',
      image: 'https://images.unsplash.com/photo-1555694702749-0bcc75b53a7d?w=600&h=800&fit=crop'
    },
    {
      id: 'complex-1',
      title: 'مجمع سكني',
      description: 'مجمع سكني متكامل مع حدائق وملاعب رياضية ومراكز تجارية',
      image: 'https://images.unsplash.com/photo-1576738123644-6f3ee90c82cc?w=600&h=800&fit=crop'
    },
    {
      id: 'office-1',
      title: 'مكتب إداري',
      description: 'مكتب حديث مع تصميم عصري وإطلالات رائعة',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=800&fit=crop'
    },
    {
      id: 'luxury-1',
      title: 'مشروع سكني فاخر',
      description: 'مشروع سكني راقي مع تصاميم معمارية متميزة',
      image: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=600&h=800&fit=crop'
    },
    {
      id: 'district-1',
      title: 'حي سكني جديد',
      description: 'حي سكني جديد مع خدمات متكاملة وبنية تحتية حديثة',
      image: 'https://images.unsplash.com/photo-1600121848371-bb4dc53f3a97?w=600&h=800&fit=crop'
    },
    {
      id: 'hotel-1',
      title: 'فندق سياحي',
      description: 'فندق 5 نجوم مع إطلالات رائعة وخدمات عالمية',
      image: 'https://images.unsplash.com/photo-1580537302243-9f3e3e3e3e3e?w=600&h=800&fit=crop'
    }
  ];

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (property: Property, index: number) => {
    setSelectedProperty(property);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedProperty(null);
  };

  const handleDrag = (direction: 'left' | 'right') => {
    let newIndex = currentIndex + (direction === 'right' ? 1 : -1);
    if (newIndex < 0) newIndex = properties.length - 1;
    if (newIndex >= properties.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="property-carousel">
      <div className="carousel-header">
        <p className="carousel-subtitle">عقارات حديثة ومتميزة</p>
        <h2 className="carousel-title">ما رأيك في مشاريعنا؟</h2>
      </div>
      <div className="slider-container" ref={containerRef}>
        <div className="slider-track" ref={trackRef}>
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => handleCardClick(property, index)}
            >
              <img src={property.image} alt={property.title} />
              <div className="card-hover">
                <span>معرفة المزيد</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProperty && (
        <>
          <button className="close-btn" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="property-info">
            <h3>{selectedProperty.title}</h3>
            <p>{selectedProperty.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyCarousel;
