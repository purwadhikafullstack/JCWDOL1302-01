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
import { createCategory } from '@/services/category.service';
import AuthSuperAdmin from '@/components/auth/AuthSuperAdmin';
import { toast } from 'react-toastify';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });

  const router = useRouter();

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
      const category = await createCategory(formData);
      if (!category) throw new Error('Create category failed!');
      toast.success('Create category success');
      router.push('/admin/categories');
    } catch (err) {
      console.error(err);
      toast.error('Create category failed');
    }
  };

  return (
    <AuthSuperAdmin url="/admin">
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Category Management
        </Text>
        <Card my={10}>
          <CardBody>
            <TableContainer>
              <form onSubmit={handleSubmit}>
                <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Category Name</FormLabel>
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
                  <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                      onClick={() => {
                        router.push('/admin/categories');
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
    </AuthSuperAdmin>
  );
};

export default Page;
