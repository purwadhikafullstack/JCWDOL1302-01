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

interface OrderDetails {
  orderID: string;
  orderDate: string;
  orderStatus: string;
}

interface ShippingInformation {
  label: string;
  phone: number;
  storeAddress: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  virtualAccount: number;
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

const orderDetails: OrderDetails[] = [
  {
    orderID: 'e70cebbf-a4d5-429b-a4da-7d62f867687c',
    orderDate: '21-06-2024',
    orderStatus: 'Processing',
  },
  {
    orderID: 'e70cebbf-a4d5-429b-a4da-8d62f867687d',
    orderDate: '28-06-2024',
    orderStatus: 'Processing',
  },
];

const ShippingInformation: ShippingInformation[] = [
  {
    label: 'kost',
    phone: 6584264665,
    storeAddress: 'Marunda Street 001 2211',
    shippingAddress: 'Palmerah Beruang Street 2 no 14',
    shippingMethod: 'JNE',
    paymentMethod: 'BRI ',
    virtualAccount: 15243335,
  },
];

const OrderPage: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <Box>
        <HStack>
          <Text fontSize={20}>Store :</Text>
          <Text fontSize={20}> Toko Tukang Perebut Wanita Janda Kuning</Text>
          {/* Add user information here (optional) */}
        </HStack>
      </Box>

      {/* Order ID Section */}
      <Box mt={100} mb={4}>
        <Text fontSize="20">Order ID</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Order Date</Th>
              <Th>Order Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderDetails.map((orderDetails) => (
              <Tr key={''}>
                <Td>{orderDetails.orderID}</Td>
                <Td>{orderDetails.orderDate}</Td>
                <Td>{orderDetails.orderStatus}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Shipping Information Section */}
      <Box mt={100} mb={4}>
        <Text fontSize="20">Shipping & Payment</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Label</Th>
              <Th>Phone</Th>
              <Th>Store Address</Th>
              <Th>Shipping Address</Th>
              <Th>Shipping Mehtod</Th>
              <Th>Payment Method</Th>
              <Th>Virtual Account</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ShippingInformation.map((ShippingInformation) => (
              <Tr key={''}>
                <Td>{ShippingInformation.label}</Td>
                <Td>{ShippingInformation.phone}</Td>
                <Td>{ShippingInformation.storeAddress}</Td>
                <Td>{ShippingInformation.shippingAddress}</Td>
                <Td>{ShippingInformation.shippingMethod}</Td>
                <Td>{ShippingInformation.paymentMethod}</Td>
                <Td>{ShippingInformation.virtualAccount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

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

export default OrderPage;
