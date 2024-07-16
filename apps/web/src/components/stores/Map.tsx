'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box } from '@chakra-ui/react';

type Props = {
  longitude?: number,
  latitude?: number,
  handleChangeLonglat: (longitude: number, latitude: number) => void,
}

const Map = ({
  longitude,
  latitude,
  handleChangeLonglat,
}: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.8613031, -6.2477707],
        zoom: 13,
      });

      map.on('click', (e: { lngLat: { lng: any; lat: any } }) => {
        const { lng, lat } = e.lngLat;
        handleChangeLonglat(lng, lat);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapContainerRef, handleChangeLonglat]);

  return (
    <Box
      ref={mapContainerRef}
      height={350}
      overflow="hidden"
    />
  );
};

export default Map;
