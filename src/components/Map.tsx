import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useSafetyStore } from '../store/safetyStore';

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  className?: string;
}

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key

const Map: React.FC<MapProps> = ({
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  zoom = 13,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const { currentLocation, updateLocation } = useSafetyStore();

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -100 }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;

        // Simulate location updates
        setInterval(() => {
          const lat = center.lat + (Math.random() - 0.5) * 0.01;
          const lng = center.lng + (Math.random() - 0.5) * 0.01;
          updateLocation(lat, lng);
        }, 10000);
      }
    });
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && currentLocation) {
      const position = {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      };

      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          position,
          map: mapInstanceRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4CAF50',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        });
      } else {
        markerRef.current.setPosition(position);
      }

      mapInstanceRef.current.panTo(position);
    }
  }, [currentLocation]);

  return <div ref={mapRef} className={`w-full h-full rounded-lg ${className}`} />;
};

export default Map;