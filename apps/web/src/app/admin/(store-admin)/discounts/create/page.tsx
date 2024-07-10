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
import { DISCOUNT_TYPE, DISCOUNT_UNIT } from "@/constants/discount.constant";

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
                    <option value={DISCOUNT_TYPE.productDiscount}>{DISCOUNT_TYPE.productDiscount}</option>
                    <option value={DISCOUNT_TYPE.minimumPurchase}>{DISCOUNT_TYPE.minimumPurchase}</option>
                    <option value={DISCOUNT_TYPE.buy1Get1}>{DISCOUNT_TYPE.buy1Get1}</option>
                    <option value={DISCOUNT_TYPE.freeShipping}>{DISCOUNT_TYPE.freeShipping}</option>
                    <option value={DISCOUNT_TYPE.referralCode}>{DISCOUNT_TYPE.referralCode}</option>
                  </Select>
                </FormControl>

                {(formData.type === DISCOUNT_TYPE.productDiscount ||
                  formData.type === DISCOUNT_TYPE.buy1Get1) && (
                    <>
                      <FormControl id="productId" isRequired>
                        <FormLabel>Product</FormLabel>
                        <Select
                          name="productId"
                          width="auto"
                          value={formData.productId}
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          {products?.map((product: any) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}

                {(formData.type === DISCOUNT_TYPE.productDiscount ||
                  formData.type === DISCOUNT_TYPE.minimumPurchase) && (
                    <>
                      <FormControl id="amount" isRequired>
                        <FormLabel>Amount</FormLabel>
                        <Input
                          name="amount"
                          placeholder="Amount"
                          _placeholder={{ color: 'gray.500' }}
                          type="number"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="unit" isRequired>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          name="unit"
                          width="auto"
                          value={formData.unit}
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          <option value={DISCOUNT_UNIT.amount}>{DISCOUNT_UNIT.amount}</option>
                          <option value={DISCOUNT_UNIT.percentage}>{DISCOUNT_UNIT.percentage}</option>
                        </Select>
                      </FormControl>
                    </>
                  )}

                {formData.type === DISCOUNT_TYPE.referralCode && (
                  <>
                    <FormControl id="amount" isRequired>
                      <FormLabel>Amount</FormLabel>
                      <Input
                        name="amount"
                        placeholder="Amount"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="unit" isRequired>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        name="unit"
                        width="auto"
                        value={formData.unit}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value={DISCOUNT_UNIT.amount}>{DISCOUNT_UNIT.amount}</option>
                      </Select>
                    </FormControl>
                  </>
                )}

                {formData.type === DISCOUNT_TYPE.minimumPurchase && (
                  <>
                    <FormControl id="minimumPrice" isRequired>
                      <FormLabel>Minimum Total Price</FormLabel>
                      <Input
                        name="minimumPrice"
                        placeholder="Minimum Total Price"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.minimumPrice}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {formData.unit === 'Percentage' && (
                      <FormControl id="maximumDiscount" isRequired>
                        <FormLabel>Maximum Discount</FormLabel>
                        <Input
                          name="maximumDiscount"
                          placeholder="Maximum Discount"
                          _placeholder={{ color: 'gray.500' }}
                          type="number"
                          value={formData.maximumDiscount}
                          onChange={handleChange}
                        />
                      </FormControl>
                    )}
                  </>
                )}

                {formData.type === DISCOUNT_TYPE.freeShipping && (
                  <>
                    <FormControl id="minimumOrders" isRequired>
                      <FormLabel>Minimum Order</FormLabel>
                      <Input
                        name="minimumOrders"
                        placeholder="Minimum Order"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.minimumOrders}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </>
                )}

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    onClick={() => {
                      router.push(`/admin/discounts`);
                    }}
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'red.500',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Create
                  </Button>
                </Stack>
              </Stack>
            </form>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
