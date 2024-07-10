'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { getStores } from '@/services/store.service';
import {
  createStock,
  updateStock,
  getStockByID,
} from '@/services/stock.service';
import { toast } from 'react-toastify';

type Props = { params: { id: string } };

const Page = ({ params: { id: stockId } }: Props) => {
  const [stores, setStores] = useState<any[]>([]);
  const [stock, setStock] = useState<any>(null);

  const [formData, setFormData] = useState({
    stockId,
    storeId: '',
    stock: 0,
    type: 'tambah',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getStores({});
      setStores(data?.stores);

      const stockData = await getStockByID(stockId);
      setStock(stockData);
    })();
  }, [stockId]);

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
      const product = await updateStock(stockId, formData);
      if (!product) throw new Error('Update stock failed!');
      toast.success('Update stock success');
      router.push(`/admin/products/stocks/${stock.productId}`);
    } catch (err) {
      console.error(err);
      toast.error('Update stock failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Update Stock
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                <FormControl id="category" isRequired>
                  <FormLabel>Store</FormLabel>
                  <Text>{stock?.store?.name}</Text>
                </FormControl>
                <FormControl id="type" isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select
                    name="type"
                    width="auto"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="tambah">Tambah</option>
                    <option value="kurang">Kurang</option>
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
                      router.push(`/admin/products/stocks/${stock.productId}`);
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
                    Add
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
