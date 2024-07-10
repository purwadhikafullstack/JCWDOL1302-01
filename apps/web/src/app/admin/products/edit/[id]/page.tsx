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
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getProductByID, updateProduct } from '@/services/product.service';
import { getCategories } from '@/services/category.service';
import AuthSuperAdmin from '@/components/auth/AuthSuperAdmin';
import { toast } from 'react-toastify';

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    categoryId: '',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getProductByID(id);
      setFormData({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
      });
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const data = await getCategories({});
      setCategories(data?.categories);
    })();
  }, []);

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
      const product = await updateProduct(id, formData);
      if (!product) throw new Error('Update product failed!');
      toast.success('Update product success');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error('Update product failed');
    }
  };

  return (
    <AuthSuperAdmin url="/admin">
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Product Management
        </Text>
        <Card my={10}>
          <CardBody>
            <TableContainer>
              <form onSubmit={handleSubmit}>
                <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      name="name"
                      placeholder="Name"
                      _placeholder={{ color: 'gray.500' }}
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="slug" isRequired>
                    <FormLabel>Slug</FormLabel>
                    <Input
                      name="slug"
                      placeholder="Slug"
                      _placeholder={{ color: 'gray.500' }}
                      type="text"
                      value={formData.slug}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      placeholder="Description"
                      _placeholder={{ color: 'gray.500' }}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      placeholder="Price"
                      _placeholder={{ color: 'gray.500' }}
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="category" isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select
                      name="categoryId"
                      width="auto"
                      value={formData.categoryId}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {categories?.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                      onClick={() => {
                        router.push('/admin/products');
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
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </AuthSuperAdmin>
  );
};

export default Page;
