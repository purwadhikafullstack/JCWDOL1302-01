'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Input,
  Select,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { getStoreByID } from '@/services/store.service';
import { createDiscount } from '@/services/discount.service';
import { getProducts } from '@/services/product.service';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { DISCOUNT_TYPE, DISCOUNT_UNIT } from '@/constants/discount.constant';
import DiscountTable from './DiscountTable';

const Page = () => {
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState<any>({
    storeId: user.storeId,
    type: DISCOUNT_TYPE.productDiscount,
    amount: 0,
    unit: '',
    minimumPrice: 0,
    maximumDiscount: 0,
    productId: '',
    minimumOrders: 0,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user.storeId) return;
      const data = await getProducts({});
      setProducts(data?.products);
      const dataStore = await getStoreByID(user.storeId);
      setStore(dataStore);
    })();
  }, [user.storeId]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user.storeId) return;

      const newFormData = formData;
      if (!newFormData.productId) delete newFormData.productId;

      const product = await createDiscount(newFormData);
      if (!product) throw new Error('Create discount failed!');

      toast.success('Create discount success');
      router.push(`/admin/discounts`);
    } catch (err) {
      console.error(err);
      toast.error('Create discount failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount Management
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <DiscountTable
                store={store}
                formData={formData}
                handleChange={handleChange}
                products={products}
              />
            </form>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
