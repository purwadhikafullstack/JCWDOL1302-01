import ProductList from '@/components/products/ProductList';
import Category from '@/components/products/category';
import Hero from '@/components/hero/hero';
import GeoLocation from '@/components/navbar/GeoLocation';
import BannerPromo from '@/components/promo/BannerPromo';
import { Divider } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <GeoLocation />
      <Hero />
      <Category />
      <Divider />
      <BannerPromo />
      <ProductList />
    </>
  );
}