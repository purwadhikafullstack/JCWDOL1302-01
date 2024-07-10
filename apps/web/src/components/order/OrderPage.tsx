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
import OrderItems from './OrderItems';
import ShippingPage from './ShippingPage';

interface OrderDetails {
  orderID: string;
  orderDate: string;
  orderStatus: string;
}
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
        <ShippingPage />
        <OrderItems />
      </Box>
    </div>
  );
};

export default OrderPage;
