import React, { useState, useEffect } from 'react'
import './index.css'

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
        const response = await fetch('https://skyunit-backend-api-production.up.railway.app/api/properties')
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
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
          },
          {
            id: '2',
            title: 'Modern Apartment Cairo',
            price: 450000,
            location: 'New Cairo',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
          },
          {
            id: '3',
            title: 'Beach House Alexandria',
            price: 1200000,
            location: 'Alexandria Coast',
            image: 'https://images.unsplash.com/photo-1500382017468-7049fae79241?w=500',
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">SkyUnit Frontend</h1>
          <p className="text-gray-600 mt-2">منصة متقدمة لحجز العقارات</p>
          <p className="text-gray-600">Professional Real Estate Booking Platform</p>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">جاري تحميل العقارات...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">لا توجد عقارات متاحة</p>
            </div>
          ) : (
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-indigo-600 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">📍 {property.location}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">EGP {property.price.toLocaleString()}</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    احجز الآن | Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 SkyUnit - منصة الحجز الذكي</p>
        </div>
      </footer>
    </div>
  )
}

export default App
