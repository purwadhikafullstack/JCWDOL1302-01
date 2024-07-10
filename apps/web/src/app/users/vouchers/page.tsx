import {
  Button,
  ButtonGroup,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

const page = () => {
  return (
    <div>
      <Text
        as={'b'}
        fontSize={'2xl'}
        fontFamily={'monospace'}
        align={{ base: 'center', sm: 'center' }}
      >
        My Vouchers
      </Text>
      <Divider mb={5} mt={5} />
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Voucher Type</Th>
              <Th>Expiry Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>test</Td>
              <Td>test</Td>
              <Td>test</Td>
            </Tr>
            {/* {data.orders?.map((order: any, index: number) => (
              <Tr key={order.id}>
                <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                <Td>{order.orderNumber}</Td>
                <Td>{order.orderDate}</Td>
                <Td>{order.store.name}</Td>
                <Td>{FormatCurrency(order.itemsPrice)}</Td>
                <Td>{FormatCurrency(order.shippingPrice)}</Td>
                <Td>{FormatCurrency(-order.itemsDiscount)}</Td>
                <Td>{FormatCurrency(-order.shippingDiscount)}</Td>
                <Td>{FormatCurrency(-order.voucherDiscount)}</Td>
                <Td>{FormatCurrency(-order.referralDiscount)}</Td>
                <Td>{FormatCurrency(order.totalPrice)}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>{order.orderStatus}</Td>
                <Td>{`${order.shippingCourier} - ${order.shippingService}`}</Td>
                <Td>{order.shippingStatus}</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        router.push(`/users/orders/${order.id}`);
                      }}
                    >
                      Detail
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
