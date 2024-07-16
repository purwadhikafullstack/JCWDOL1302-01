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
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { getStoreByID } from '@/services/store.service';
import { getDiscountByID, updateDiscount } from '@/services/discount.service';
import { getProducts } from '@/services/product.service';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { DISCOUNT_TYPE, DISCOUNT_UNIT } from '@/constants/discount.constant';
import EditDiscountButtons from './EditDiscountButtons';
import FormDataTypeDiscount from './FormDataTypeDiscount';

type Props = { params: { id: string } };

const Page = ({ params: { id: discountId } }: Props) => {
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

  useEffect(() => {
    (async () => {
      const data = await getDiscountByID(discountId);
      setFormData({
        storeId: data.storeId,
        type: data.type,
        amount: data.amount,
        unit: data.unit,
        minimumPrice: data.minimumPrice,
        maximumDiscount: data.maximumDiscount,
        productId: data.productId,
        minimumOrders: data.minimumOrders,
      });
    })();
  }, [discountId]);

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

      const product = await updateDiscount(discountId, newFormData);
      if (!product) throw new Error('Update discount failed!');

      toast.success('Update discount success');
      router.push(`/admin/discounts`);
    } catch (err) {
      console.error(err);
      toast.error('Update discount failed');
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
              <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                <FormControl id="store">
                  <FormLabel>Store</FormLabel>
                  <Text as={'b'}>{store?.name}</Text>
                </FormControl>
                <FormControl id="type" isRequired>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    name="type"
                    width="auto"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value={DISCOUNT_TYPE.productDiscount}>
                      {DISCOUNT_TYPE.productDiscount}
                    </option>
                    <option value={DISCOUNT_TYPE.minimumPurchase}>
                      {DISCOUNT_TYPE.minimumPurchase}
                    </option>
                    <option value={DISCOUNT_TYPE.buy1Get1}>
                      {DISCOUNT_TYPE.buy1Get1}
                    </option>
                    <option value={DISCOUNT_TYPE.freeShipping}>
                      {DISCOUNT_TYPE.freeShipping}
                    </option>
                    <option value={DISCOUNT_TYPE.referralCode}>
                      {DISCOUNT_TYPE.referralCode}
                    </option>
                  </Select>
                </FormControl>

                <FormDataTypeDiscount
                  formData={formData}
                  handleChange={handleChange}
                  products={products}
                  store={store}
                />
                <EditDiscountButtons />
              </Stack>
            </form>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
