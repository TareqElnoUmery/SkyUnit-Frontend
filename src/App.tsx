import React, { useState, useEffect } from 'react'
import './index.css'
/// <reference types="vite/client" />

interface Property {
  id: string
  title: string
  price: number
  location: string
  image: string
}

function App() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/properties`)
        const data = await response.json()
        setProperties(data || [])
      } catch (error) {
        console.error('Error fetching properties:', error)
        setProperties([
          {
            id: '1',
            title: 'Luxury Villa Dubai',
            price: 2500000,
            location: 'Dubai Marina',
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'
          },
          {
            id: '2',
            title: 'Modern Apartment Cairo',
            price: 500000,
            location: 'New Cairo',
            image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500'
          },
          {
            id: '3',
            title: 'Beach House Alexandria',
            price: 1200000,
            location: 'Alexandria',
            image: 'https://images.unsplash.com/photo-1570129477492-45ba003e0651?w=500'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">SkyUnit</h1>
          <p className="text-lg text-blue-100">منصة متخصصة لحجز العقارات | Professional Real Estate Booking Platform</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">جاري تحميل العقارات...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">العقارات المتاحة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-2">📍 {property.location}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">{property.price.toLocaleString()} EGP</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      احجز الآن | Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 SkyUnit - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  )
}

export default App
