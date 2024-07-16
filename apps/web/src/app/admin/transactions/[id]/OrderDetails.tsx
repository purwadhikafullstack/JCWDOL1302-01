import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  order: any;
};

const OrderDetails = ({ order }: Props) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Product Name</Th>
            <Th>Description</Th>
            <Th>Quantity</Th>
            <Th>Bonus Quantity</Th>
            <Th>Price</Th>
            <Th>Discount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order?.orderItems?.map((item: any, index: number) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.bonusQuantity > 0 && item.bonusQuantity}</Td>
              <Td>{FormatCurrency(item.price)}</Td>
              <Td>{item.discount > 0 && FormatCurrency(-item.discount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;
