import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import PromoBadge from './PromoBadge';
import SelectStores from './SelectStores';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link';

type Props = {
  product: any;
  stores: any;
  stock: any;
  discount: any;
  cart: any;
  isAllow: any;
  formData: any;
  setFormData: any;
  handleChangeStore: any;
  handleSubmit: any;
  setStock: any;
  setDiscount: any;
};

const ProductForm = ({
  product,
  stores,
  stock,
  discount,
  cart,
  isAllow,
  formData,
  setFormData,
  handleChangeStore,
  handleSubmit,
  setStock,
  setDiscount,
}: Props) => {
  useEffect(() => {
    const lastVisitedPage = () => {
      const lastVisited = localStorage.getItem('lastVisitedPage');

      if (!lastVisited) {
        const currentPage = window.location.href;
        localStorage.setItem('lastVisitedPage', currentPage);
      }
    };

    localStorage.removeItem('lastVisitedPage');

    lastVisitedPage();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {product.name}
          </Heading>
        </Box>
        <PromoBadge
          discount={discount}
          product={product}
          formData={formData}
          prevFormData={formData}
          setFormData={setFormData}
          cart={cart}
          setStock={setStock}
          stock={stock}
          setDiscount={setDiscount}
        />
        <SelectStores
          formData={formData}
          stock={stock}
          setFormData={setFormData}
          product={product}
          stores={stores}
          isAllow={isAllow}
          handleChangeStore={handleChangeStore}
          cart={cart}
        />
        {isAllow ? (
          <AddToCartButton formData={formData} />
        ) : (
          <Alert status="info" borderRadius={5} mt={4}>
            <AlertIcon />
            Please login as customer or verify your email address!
          </Alert>
        )}
        <FormControl id="category">
          <FormLabel display={'inline'}>Category:</FormLabel>
          <Link href={`/products?category=${product.category.slug}`}>
            <Text
              as={'span'}
              color={'green.500'}
              _hover={{ textDecoration: 'underline' }}
            >
              {product.category.name}
            </Text>
          </Link>
        </FormControl>
      </Stack>
    </form>
  );
};

export default ProductForm;
