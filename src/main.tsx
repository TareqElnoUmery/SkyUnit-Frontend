import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>SkyUnit - Real Estate Booking Platform</h1>
      <p>Welcome to SkyUnit Frontend</p>
      <p>Connected to Backend API: {import.meta.env.VITE_API_BASE_URL || 'Not configured'}</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
