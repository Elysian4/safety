import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import TrackingHistory from './pages/TrackingHistory';
import SafetyAlerts from './pages/SafetyAlerts';
import DevicePairing from './pages/DevicePairing';
import Help from './pages/Help';
import Privacy from './pages/Privacy';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar isScrolled={isScrolled} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/tracking-history" element={<TrackingHistory />} />
          <Route path="/safety-alerts" element={<SafetyAlerts />} />
          <Route path="/device-pairing" element={<DevicePairing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        
        {/* Global SOS Button */}
        <button 
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
          onClick={() => alert('SOS Triggered! Emergency services notified.')}
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="font-bold">SOS</span>
        </button>
      </div>
    </Router>
  );
}

export default App;