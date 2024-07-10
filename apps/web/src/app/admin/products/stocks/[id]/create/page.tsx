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

import { getStores } from '@/services/store.service';
import { createStock } from '@/services/stock.service';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { getProductByID } from '@/services/product.service';

type Props = { params: { id: string } };

const Page = ({ params: { id: productId } }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [stores, setStores] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    productId,
    storeId: '',
    stock: 0,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getStores({});

      if (user.role === 'store_admin') {
        setStores(
          data?.stores.filter((store: any) => store.id === user.storeId),
        );
      } else {
        setStores(data?.stores);
      }
    })();
  }, [user.role, user.storeId]);

  useEffect(() => {
    (async () => {
      const resultProduct = await getProductByID(productId);
      setProduct(resultProduct);
    })();
  }, [productId]);

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
      const product = await createStock(formData);
      if (!product) throw new Error('Create stock failed!');
      toast.success('Create stock success');
      router.push(`/admin/products/stocks/${productId}`);
    } catch (err) {
      console.error(err);
      toast.error('Create stock failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Add Stock for Product &quot;{product?.name}&quot;
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                <FormControl id="category" isRequired>
                  <FormLabel>Store</FormLabel>
                  <Select
                    name="storeId"
                    width="auto"
                    value={formData.storeId}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    {stores?.map((store: any) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="stock" isRequired>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    name="stock"
                    placeholder="Stock"
                    _placeholder={{ color: 'gray.500' }}
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    onClick={() => {
                      router.push(`/admin/products/stocks/${product.id}`);
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
