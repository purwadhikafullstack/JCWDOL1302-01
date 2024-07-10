'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { getProductBySlug } from '@/services/product.service';
import ProductDetails from '@/components/ProductPage/products/ProductDetails';
import Loading from "@/components/loading/Loading";
import NotFoundPage from "@/app/not-found";

type Props = { params: { slug: string } };

const Page = ({ params: { slug } }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getProductBySlug(slug);
      setProduct(data);
      setIsLoading(false);
    })();
  }, [slug]);

  if (isLoading) return <Loading />;
  if (!product) return <></>;

  return <ProductDetails product={product} />;
};

export default Page;
