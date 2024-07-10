import ProductList from '@/components/ProductList';
import Category from '@/components/category';
import Hero from '@/components/hero';
import GeoLocation from '@/components/navbar/GeoLocation';

export default function Home() {
  return (
    <>
      <GeoLocation />
      <Hero />
      <Category />
      <ProductList />
    </>
  );
}
