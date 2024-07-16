'use client';

import ProductList from '@/components/products/ProductList';
import Category from '@/components/products/category';
import Hero from '@/components/hero/hero';
import GeoLocation from '@/components/navbar/GeoLocation';
import BannerPromo from '@/components/promo/BannerPromo';
import { Divider, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const lastVisitedPage = () => {
      const lastVisited = localStorage.getItem('lastVisitedPage');

      if (!lastVisited) {
        const currentPage = window.location.href;
        localStorage.setItem('lastVisitedPage', currentPage);
      }
    };

    localStorage.removeItem('lastVisitedPage');

    lastVisitedPage();
  }, []);
  return (
    <>
      <Stack bgGradient={'linear(to-b, white, gray.100)'}>
        <GeoLocation />
        <Hero />
        <Category />
        <Divider />
        <BannerPromo />
        <ProductList />
      </Stack>
    </>
  );
}
