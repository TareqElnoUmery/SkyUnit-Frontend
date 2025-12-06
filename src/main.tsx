import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">SkyUnit Frontend</h1>
        <p className="text-lg text-gray-700 mb-6">منصة محترفة لحجز العقارات</p>
        <p className="text-gray-600">Professional Real Estate Booking Platform</p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
