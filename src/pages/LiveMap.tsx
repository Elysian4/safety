import React from 'react';
import { MapPin } from 'lucide-react';
import Map from '../components/Map';
import { useSafetyStore } from '../store/safetyStore';
import { format } from 'date-fns';

const LiveMap = () => {
  const { currentLocation, status } = useSafetyStore();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Live Location Tracking</h1>
            <div className="flex items-center gap-2 text-blue-600">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Live</span>
            </div>
          </div>
          
          <div className="h-[600px] relative">
            <Map className="w-full h-full" />
            
            {/* SOS Button */}
            <button 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
              onClick={() => alert('SOS Activated! Emergency services have been notified.')}
            >
              <span className="font-bold text-lg">SOS</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Current Location</h3>
              <p className="text-blue-700 mt-1">
                {currentLocation 
                  ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
                  : 'Updating...'}
              </p>
            </div>
            <div className={`${
              status === 'safe' ? 'bg-green-50' : 'bg-red-50'
            } rounded-lg p-4`}>
              <h3 className={`font-medium ${
                status === 'safe' ? 'text-green-900' : 'text-red-900'
              }`}>Safety Status</h3>
              <p className={`mt-1 ${
                status === 'safe' ? 'text-green-700' : 'text-red-700'
              }`}>
                {status === 'safe' ? 'Safe Zone' : 'At Risk'}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Last Updated</h3>
              <p className="text-purple-700 mt-1">
                {currentLocation
                  ? format(new Date(currentLocation.timestamp), 'HH:mm:ss')
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;