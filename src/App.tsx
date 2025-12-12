import React, { useState, useEffect } from 'react';
import './index.css';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://skyunit-api.railway.app';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [properties, setProperties] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [userCredit, setUserCredit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('skyunit_token'));

  // Fetch properties on component mount
  useEffect(() => {
    setIsLoaded(true);
    fetchProperties();
    if (token) {
      fetchUserDashboard();
    }
  }, [token]);

  // Fetch available properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/units`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data.units || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user dashboard data
  const fetchUserDashboard = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUserCredit(data.user.subscription_tier || 0);

      // Fetch bookings
      const bookingsResponse = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setUserBookings(bookingsData.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    }
  };

  const features = [
    { id: 'ai', title: '🤖 AI Assistant', desc: 'Smart real estate companion', color: '#00f2ff' },
    { id: 'map', title: '🗺️ Map View', desc: 'Interactive property map', color: '#c41eff' },
    { id: 'booking', title: '📅 Smart Booking', desc: 'Quick and secure booking', color: '#ff6a00' },
    { id: 'alerts', title: '🔔 Price Alerts', desc: 'Get notified on best deals', color: '#00ff9d' },
    { id: 'premium', title: '⭐ Premium Access', desc: 'Exclusive properties', color: '#ffd700' },
    { id: 'support', title: '🎧 24/7 Support', desc: 'Always here to help', color: '#ff0044' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyan-500/20 sticky top-0 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">SkyUnit v9</h1>
            <nav className="flex gap-8">
              <button onClick={() => setCurrentSection('home')} className="hover:text-cyan-400 transition-colors">Home</button>
              <button onClick={() => setCurrentSection('features')} className="hover:text-cyan-400 transition-colors">Features</button>
              <button onClick={() => setCurrentSection('about')} className="hover:text-cyan-400 transition-colors">About</button>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          {/* Error message */}
          {error && <div className="bg-red-500/20 border border-red-500 p-4 rounded mb-6">{error}</div>}

          {currentSection === 'home' && (
            <div className="space-y-12">
              {/* Dashboard Section */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                  <h3 className="text-gray-400 text-sm mb-2">Available Properties</h3>
                  <p className="text-4xl font-bold text-cyan-400">{properties.length}</p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                  <h3 className="text-gray-400 text-sm mb-2">Your Bookings</h3>
                  <p className="text-4xl font-bold text-purple-400">{userBookings.length}</p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                  <h3 className="text-gray-400 text-sm mb-2">Service Credits</h3>
                  <p className="text-4xl font-bold text-green-400">{userCredit}</p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <h2 className="text-6xl font-bold">Welcome to <span className="text-cyan-400">SkyUnit</span></h2>
                <p className="text-xl text-gray-400">The intelligent real estate platform</p>
                <div className="flex gap-6 justify-center pt-8">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-lg font-semibold">Get Started</button>
                  <button className="px-8 py-4 border-2 border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold">Learn More</button>
                </div>
              </div>

              {/* Properties Grid */}
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      onMouseEnter={() => setHoveredCard(property.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="p-8 rounded-xl border-2 border-gray-700 bg-gray-800/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
                    >
                      <h3 className="text-xl font-bold mb-2">{property.unit_name || 'Property'}</h3>
                      <p className="text-gray-400 mb-4">{property.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-bold">${property.price || 'N/A'}</span>
                        <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">No properties available at the moment</div>
              )}

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    onMouseEnter={() => setHoveredCard(feature.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="p-8 rounded-xl border-2 border-gray-700 bg-gray-800/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-4xl mb-4">{feature.title.split(' ')[0]}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'features' && (
            <div className="space-y-12">
              <h2 className="text-5xl font-bold text-center mb-16">Advanced Features</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {features.map((feature) => (
                  <div key={feature.id} className="p-8 rounded-xl border-2 border-gray-700 bg-gray-800/30">
                    <div className="text-5xl mb-4">{feature.title.split(' ')[0]}</div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 text-lg mb-6">{feature.desc}</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold">Explore</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'about' && (
            <div className="space-y-12">
              <h2 className="text-5xl font-bold text-center mb-16">About SkyUnit</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300">
                <p>SkyUnit is revolutionizing the real estate industry with AI-powered intelligence.</p>
                <p>We believe finding your perfect property should be easy, intuitive, and empowering.</p>
                <p>Join thousands of satisfied users who have found their dream properties with SkyUnit.</p>
                <p className="text-cyan-400 font-bold">Available Properties: {properties.length}</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 bg-black/50 backdrop-blur-md mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-400">
            <p>© 2025 SkyUnit - The Intelligent Real Estate Platform</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
