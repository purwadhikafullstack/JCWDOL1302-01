'use client';
import React, { useEffect } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

interface GeolocationPosition {
  coords: GeolocationCoords;
}

const GeoLocation = () => {
  useEffect(() => {
    const x: HTMLElement | null = document.getElementById('demo');

    function getLocation(): void {
      const location = localStorage.getItem('location');
      if (!location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      }
    }

    function showPosition(position: GeolocationPosition): void {
      localStorage.setItem(
        'location',
        JSON.stringify({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }),
      );
    }

    getLocation();
  }, []);
  return <></>;
};

export default GeoLocation;
