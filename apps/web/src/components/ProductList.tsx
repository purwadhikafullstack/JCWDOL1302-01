'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import Link from 'next/link';
import { getProducts } from '@/services/product.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductList = () => {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 8,
  });

  useEffect(() => {
    (async () => {
      const result = await getProducts(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Heading
        textAlign={'center'}
        mt={{ base: '10', sm: '10' }}
        mb={5}
        fontFamily={'monospace'}
      >
        Groceries Near You
      </Heading>
      <Divider mb={10} />
      <Stack
        pb={10}
        pt={5}
        bg={'teal'}
        bgGradient={'linear(to-r, teal.200, green.500)'}
      >
        <Grid
          templateColumns={{ base: 'repeat(1, 2fr)', sm: 'repeat(4, 2fr)' }}
          gap={6}
        >
          {data.products?.map((product: any, index: number) => (
            <GridItem w={'full'} flexDirection={'column'} p={5} key={index}>
              <Card
                h={'100%'}
                key={index}
                maxW="xl"
                shadow={'xl'}
                w={'full'}
                transition={'0.25s all ease-in-out'}
                _hover={{
                  transform: 'translateY(-15px)',
                  boxShadow: 'lg',
                }}
                borderRadius={'2xl'}
              >
                <CardBody>
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/products/${product.productImages[0]?.image}`}
                      alt="Green double couch with wooden legs"
                      borderRadius="2xl"
                      width={'500px'}
                      height={'200px'}
                      fit={'cover'}
                    />
                    <Stack mt="3" spacing="3" textAlign={'center'}>
                      <Heading size="md" noOfLines={4}>
                        {product.name}
                      </Heading>
                      <Text>{product.category.name}</Text>
                      <Text color="blue.600" fontSize="lg" mt={5} as={'b'}>
                        {FormatCurrency(product.price)}
                      </Text>
                    </Stack>
                  </Link>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
        <Box pt={4} display="flex" justifyContent="center">
          <Box display="flex">
            <IconButton
              aria-label="left"
              icon={<Icon as={FiChevronLeft} />}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: Math.max(prevFilters.page - 1, 1),
                }))
              }
              isDisabled={filters.page === 1}
            />
            <Box p={2}>
              {filters.page} / {data.pages}
            </Box>
            <IconButton
              aria-label="right"
              icon={<Icon as={FiChevronRight} />}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: Math.min(prevFilters.page + 1, data.pages),
                }))
              }
              isDisabled={filters.page === data.pages}
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default ProductList;