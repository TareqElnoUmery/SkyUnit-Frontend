import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const saved = localStorage.getItem('skyunit_user');
    if (saved) setUserInfo(JSON.parse(saved));
  }, []);

  const features = [
    {
      id: 'ai',
      title: '🤖 AI Assistant',
      desc: 'Smart real estate companion with learning capabilities',
      color: '#00f2ff'
    },
    {
      id: 'map',
      title: '🗺️ Map View',
      desc: 'Interactive map with all available properties',
      color: '#c41eff'
    },
    {
      id: 'booking',
      title: '📅 Smart Booking',
      desc: 'Quick and secure booking system',
      color: '#ff6a00'
    },
    {
      id: 'alerts',
      title: '🔔 Price Alerts',
      desc: 'Get notified on the best deals',
      color: '#00ff9d'
    },
    {
      id: 'premium',
      title: '⭐ Premium Access',
      desc: 'Exclusive properties and features',
      color: '#ffd700'
    },
    {
      id: 'support',
      title: '🎧 24/7 Support',
      desc: 'Always here to help your journey',
      color: '#ff0044'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white font-sans">
      {/* Hero Section with Animated Background */}
      <div className={`fixed inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          {currentSection === 'home' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="text-center space-y-6">
                <h2 className="text-6xl font-bold tracking-tight leading-tight">
                  Welcome to <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">SkyUnit</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  The intelligent real estate platform that learns your preferences and finds your perfect property.
                </p>
                <div className="flex gap-6 justify-center pt-8">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50">
                    Get Started
                  </button>
                  <button className="px-8 py-4 border-2 border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold transition-all">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Features Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    onMouseEnter={() => setHoveredCard(feature.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer transform ${
                      hoveredCard === feature.id
                        ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-lg shadow-cyan-500/50'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                    }`}
                    style={{
                      borderColor: hoveredCard === feature.id ? feature.color : undefined,
                      boxShadow: hoveredCard === feature.id ? `0 0 30px ${feature.color}40` : 'none'
                    }}
                  >
                    <div className="text-4xl mb-4">{feature.title.split(' ')[0]}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'features' && (
            <div className="space-y-12 animate-fadeIn">
              <h2 className="text-5xl font-bold text-center mb-16">Advanced Features</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {features.map((feature) => (
                  <div key={feature.id} className="p-8 rounded-xl border-2 border-gray-700 bg-gray-800/30">
                    <div className="text-5xl mb-4">{feature.title.split(' ')[0]}</div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 text-lg mb-6">{feature.desc}</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-semibold transition-all">
                      Explore →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'about' && (
            <div className="space-y-12 animate-fadeIn">
              <h2 className="text-5xl font-bold text-center mb-16">About SkyUnit</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  SkyUnit is revolutionizing the real estate industry with AI-powered intelligence and user-centric design.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  We believe that finding your perfect property should be easy, intuitive, and empowering.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Join thousands of satisfied users who have already found their dream properties with SkyUnit.
                </p>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default App;
