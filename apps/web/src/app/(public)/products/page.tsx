import ProductCatalog from '@/components/products/ProductCatalog';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      <ProductCatalog />
    </Suspense>
  );
};

export default page;
