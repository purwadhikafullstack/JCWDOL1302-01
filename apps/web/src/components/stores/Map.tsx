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
  const accessToken =
    'pk.eyJ1IjoicmVoYW5hZGkiLCJhIjoiY2x4enRybzFzMGU1YzJ2cXZrcmxqYnkzZSJ9.vs6SmfosBPqUZ7HSvEsbhw';
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Store marker instance
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = accessToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.8613031, -6.2477707],
        zoom: 13,
      });

      map.on('click', (e: { lngLat: { lng: any; lat: any } }) => {
        const { lng, lat } = e.lngLat;
        handleChangeLonglat(lng, lat);

        // Create and add marker on click
        if (!markerRef.current) {
          // Check if marker exists
          const marker = new mapboxgl.Marker({
            color: 'green',
          });
          marker.setLngLat([lng, lat]).addTo(map);
          markerRef.current = marker; // Store marker reference
          // map.addLayer(marker as any);
        } else {
          // Update existing marker position
          markerRef.current!.setLngLat([lng, lat]);
        }
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
