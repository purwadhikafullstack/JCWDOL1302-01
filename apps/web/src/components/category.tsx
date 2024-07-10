'use client';

import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '@/services/category.service';

const Category = () => {
  const [data, setData] = useState({
    categories: [],
    pages: 1,
  });

  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10,
  });

  useEffect(() => {
    (async () => {
      const result = await getCategories(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Heading
        textAlign={'center'}
        mt={{ base: '5', sm: '-20' }}
        p={5}
        fontFamily={'monospace'}
      >
        Select from Categories
      </Heading>
      <Divider />
      <Flex
        mt={{ base: '5', sm: '2' }}
        pt={5}
        pb={20}
        bgImage={'/assets/images/bgline1.png'}
        bgSize={{ base: 'auto', sm: 'cover' }}
        bgPos={{ base: 'left', sm: 'unset' }}
      >
        <Container p={'auto'}>
          <Box justifyContent={'center'}>
            <Grid
              templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }}
              gap={10}
              textAlign={'center'}
            >
              {data.categories?.map((category: any, index: number) => (
                <GridItem key={index}>
                  <Link href={`/products?category=${category.slug}`}>
                    <Image
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/categories/${category.image}`}
                      transition={'0.25s all ease-in-out'}
                      _hover={{
                        transform: 'translateY(-5px)',
                        boxShadow: 'lg',
                      }}
                      objectFit={'cover'}
                      width={'120px'}
                      height={'80px'}
                      borderRadius={'xl'}
                      alt={category.name}
                      mb={2}
                    />
                    <Text _hover={{ color: 'green' }} as={'cite'}>
                      {category.name}
                    </Text>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default Category;
