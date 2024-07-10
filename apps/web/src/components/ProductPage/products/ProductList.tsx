'use client';

import {
  Heading,
  Stack,
  Divider,
  SimpleGrid,
  Box,
  Flex,
  AspectRatio,
  Text,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  InputRightElement,
  InputGroup,
  Input,
  useTheme,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import CategoryFilter from './CategoryFilter';

interface Product {
  id: number;
  name: string;
  category: string;
}
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Array of all products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Array of filtered products
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [selectedCategory, setSelectedCategory] = useState('all'); // Selected category state
  // Fetch product data (replace with your actual API call)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products'); // Adjust API endpoint
      const productData: Product[] = await response.json();
      setProducts(productData);
      setFilteredProducts(productData); // Initially, filtered products are all products
    };

    fetchProducts();
  }, []); // Filter products based on search term and category

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategory === 'all' || product.category === selectedCategory;
      return nameMatch && categoryMatch;
    });

    setFilteredProducts(filteredProducts);
  }, [searchTerm, selectedCategory, products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const theme = useTheme(); // Access Chakra UI theme

  return (
    <>
      {' '}
      <>
        {' '}
        <Stack direction={['column', 'column', 'row']} spacing={4}>
          <CategoryFilter /> {/* Call CategoryFilter component */}
          <Box as="section" flex={1}>
            {/* Wrap product list in a section */}
            <Divider /> {/* Improved Layout with Consistent Sizing */}
            {/* Search Bar */}
            <Text
              as="p"
              textAlign="center"
              mt={{ base: '10', sm: '5' }}
              mb="5"
              fontSize={{ base: '2xl', sm: '3xl' }}
              fontWeight="medium"
            >
              Groceries Near You{' '}
            </Text>{' '}
            <Stack direction="row">
              {' '}
              {/* Flex container */}
              {/* Your other content here */}{' '}
              {/* Place other content on the left */}
              <Flex>
                <Box flex={1}>
                  {' '}
                  {/* Fills remaining space */}
                  <Stack
                    mt={{ base: '10', sm: '20' }}
                    mb="5"
                    fontSize={{ base: '2xl', sm: '3xl' }}
                    fontWeight="medium"
                    width={300}
                    alignItems={'flex-end'}
                  >
                    <InputGroup>
                      <Input
                        placeholder="Search Groceries..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <InputRightElement>
                        <IconButton icon={<SearchIcon />} aria-label="Search" />
                      </InputRightElement>
                    </InputGroup>
                  </Stack>
                </Box>
              </Flex>
            </Stack>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={5}>
              {/* Replace with actual product data if needed */}
              {/* Add more product cards as needed */}{' '}
            </SimpleGrid>{' '}
          </Box>{' '}
        </Stack>{' '}
      </>{' '}
    </>
  );
};

export default ProductList;
