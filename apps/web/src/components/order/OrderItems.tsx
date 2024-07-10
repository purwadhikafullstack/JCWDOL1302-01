import React from 'react';
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Input,
  Button,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const orderItems: OrderItem[] = [
  {
    name: 'Item 1',
    image:
      'https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431',
    price: 10,
    quantity: 1,
  },
  {
    name: 'Item 2',
    image: 'https://gratisongkir-storage.com/products/900x900/FC6WmSRVFl6Z.jpg',
    price: 20,
    quantity: 2,
  },
];

const OrderItems: React.FC = () => {
  return (
    <div>
      {/* Order Items Section */}
      <Box mt={100} mb={4}>
        <Text fontSize="xl">Order Items</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderItems.map((item) => (
              <Tr key={''}>
                <Td>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={item.image}
                    alt={item.name}
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  <Input isDisabled value={item.quantity.toString()} />
                </Td>
                <Td>Rp{item.price.toLocaleString('id-ID')}</Td>
                <Td>
                  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Purchase Information Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Purchase Information</Text>
        <Text>Payment Method: Credit Card</Text>
        <Text>
          Total Price: Rp
          {orderItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString('id-ID')}
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      </Box>
    </div>
  );
};

export default OrderItems;
