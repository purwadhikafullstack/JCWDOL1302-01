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
  Image,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  Grid,
  AvatarBadge,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  createProductImage,
  deleteProductImage,
  getProductByID,
} from '@/services/product.service';
import AuthSuperAdmin from '@/components/auth/AuthSuperAdmin';
import { toast } from 'react-toastify';
import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';

type Props = { params: { id: string } };

type MyImageProps = {
  src: string;
  alt: string;
  key?: any;
  borderRadius?: number;
  icon?: React.ReactElement;
};

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getProductByID(id);
      setProduct(data);
    })();
  }, [id]);

  const handleDelete = async (imageId: string) => {
    if (!confirm(`Are you sure want to delete this image?`) || !imageId) return;

    try {
      const productImage = await deleteProductImage(imageId);
      if (!productImage) throw new Error('Delete product image failed!');
      toast.success('Delete product image success');

      const data = await getProductByID(id);
      setProduct(data);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Delete product image failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const inputFile = document.getElementById('image') as HTMLInputElement;
      formData.append('image', inputFile?.files?.item(0) as File);
      formData.append('productId', id);

      const productImage = await createProductImage(formData);
      if (!productImage) throw new Error('Upload product image failed!');
      toast.success('Upload product image success');

      const data = await getProductByID(id);
      setProduct(data);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        'Upload product image failed! Please upload file with extension .jpg, .jpeg, .png, .gif and maximum size 1MB!',
      );
    }
  };

  return (
    <AuthSuperAdmin url="/admin">
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Images for Product {`"${product?.name}"`}
        </Text>
        <Card my={10} p={10}>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack spacing={6} w={'full'} rounded={'xl'} my={6} mb={16}>
                <FormControl id="name" isRequired>
                  <FormLabel>Image</FormLabel>
                  <Input
                    id="image"
                    name="image"
                    _placeholder={{ color: 'gray.500' }}
                    type="file"
                  />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Upload
                  </Button>
                </Stack>
              </Stack>
            </form>
            <TableContainer>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {product?.productImages?.map((item: any, index: number) => (
                  <Stack
                    key={index}
                    direction={['column', 'row']}
                    spacing={6}
                    position="relative"
                    overflow="visible"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/products/${item.image}`}
                      alt=""
                      key={item.id}
                      borderRadius={25}
                    />
                    <Badge
                      size="sm"
                      rounded="full"
                      position="absolute"
                      top={0}
                      right={0}
                      colorScheme="red"
                      variant="solid"
                      px={2}
                      py={1}
                      border={1}
                      borderStyle="solid"
                      borderColor="red"
                      cursor="pointer"
                      _hover={{ backgroundColor: 'white', color: 'red' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <SmallCloseIcon />
                    </Badge>
                  </Stack>
                ))}
                {/* <GridItem w='100%' h='10' bg='blue.500' /> */}
              </Grid>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </AuthSuperAdmin>
  );
};

export default Page;
