'use client';

import { getNearestStore } from '@/services/store.service';
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
    const getLocation = () => {
      const location = localStorage.getItem('location');
      if (!location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      }
    };

    const showPosition = (position: GeolocationPosition) => {
      (async () => {
        const userLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        const store = await getNearestStore(userLocation);
        localStorage.setItem(
          'location',
          JSON.stringify({ ...userLocation, storeId: store?.id }),
        );
      })();
    };

    getLocation();
  }, []);

  return <></>;
};

export default GeoLocation;
