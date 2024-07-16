import React from 'react';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc?: string; // Optional field for product image URL
}

const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 29.99,
    quantity: 2,
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 49.99,
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
  },
];

export default function SummaryCartPage() {
  const calculateSubtotal = (): number => {
    let subtotal = 0;
    cartItems.forEach((item) => (subtotal += item.price * item.quantity));
    return subtotal;
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const total = subtotal + 5;
    return total;
  };

  return (
    <Box p={6}>
      <Heading as="h1" fontSize="3xl" mb={8}>
        Summary Cart
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Subtotal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartItems.map((item) => (
            <Tr key={item.id}>
              <Td display="flex" alignItems="center">
                {/*{item.imageSrc && <Image src={item.imageSrc} alt={item.name} width="50px" mr={2} />}
                {item.name} */}
              </Td>
              <Td>${item.price.toFixed(2)}</Td>
              <Td>{item.quantity}</Td>
              <Td>${(item.price * item.quantity).toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Stack mt={8} spacing={4}>
        <Flex justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Subtotal:
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            ${calculateSubtotal().toFixed(2)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Shipping:
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            $5.00
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Total:
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            ${calculateTotal().toFixed(2)}
          </Text>
        </Flex>
        <Button colorScheme="blue" size="lg">
          Proceed to Checkout
        </Button>
      </Stack>
    </Box>
  );
}
