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

interface ShippingInformation {
  label: string;
  phone: number;
  storeAddress: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  virtualAccount: number;
}

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

const ShippingPage: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default ShippingPage;
