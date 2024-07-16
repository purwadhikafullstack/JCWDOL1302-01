'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  ButtonGroup,
  Button,
  Flex,
  Input,
  Select,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { getOrders } from '@/services/order.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { formatDate } from '@/utils/date';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Range, RangeKeyDict } from 'react-date-range';
import { ORDER_STATUS } from '@/constants/order.constant';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DatePicker from './DatePicker';
import TransactionsPagination from './TransactionsPagination';

const Page = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState({
    orders: [],
    pages: 1,
  });
  const [range, setRange] = useState<Range[]>([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: 'selection',
    },
  ]);
  const [filters, setFilters] = useState({
    storeId: user.storeId as string,
    startDate: '',
    endDate: '',
    orderStatus: '',
    keyword: '',
    page: 1,
    size: 10,
  });
  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef(null);

  useOutsideClick({
    ref: ref,
    handler: () => setShowPicker(false),
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    setRange([ranges.selection]);
  };

  useEffect(() => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      startDate: format(range[0].startDate!, 'yyyy-MM-dd'),
      endDate: format(range[0].endDate!, 'yyyy-MM-dd'),
      page: 1,
    }));
  }, [range]);

  useEffect(() => {
    (async () => {
      const result = await getOrders(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <Box ref={ref}>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Transactions
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8} direction={{ base: 'column', md: 'row' }}>
            <Input
              placeholder="Search..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value, page: 1 })
              }
            />
            <Select
              name="type"
              value={filters.orderStatus}
              onChange={(e) =>
                setFilters({ ...filters, orderStatus: e.target.value, page: 1 })
              }
            >
              <option value="">- All Status -</option>
              <option value={ORDER_STATUS.menungguPembayaran}>
                {ORDER_STATUS.menungguPembayaran}
              </option>
              <option value={ORDER_STATUS.menungguKonfirmasiPembayaran}>
                {ORDER_STATUS.menungguKonfirmasiPembayaran}
              </option>
              <option value={ORDER_STATUS.diproses}>
                {ORDER_STATUS.diproses}
              </option>
              <option value={ORDER_STATUS.dikirim}>
                {ORDER_STATUS.dikirim}
              </option>
              <option value={ORDER_STATUS.pesananDikonfirmasi}>
                {ORDER_STATUS.pesananDikonfirmasi}
              </option>
              <option value={ORDER_STATUS.dibatalkan}>
                {ORDER_STATUS.dibatalkan}
              </option>
            </Select>
            <DatePicker
              range={range}
              handleRangeChange={handleRangeChange}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Order Number</Th>
                  <Th>Order Date</Th>
                  <Th>User</Th>
                  <Th>Store</Th>
                  <Th>Total Price</Th>
                  <Th>Order Status</Th>
                  <Th>Payment Method</Th>
                  <Th>Payment Date</Th>
                  <Th>Shipping Method</Th>
                  <Th>Shipping Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.orders?.map((order: any, index: number) => (
                  <Tr key={order.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{order.orderNumber}</Td>
                    <Td>{formatDate(order.orderDate)}</Td>
                    <Td>{order.user.email}</Td>
                    <Td>{order.store.name}</Td>
                    <Td>{FormatCurrency(order.totalPrice)}</Td>
                    <Td>{order.orderStatus}</Td>
                    <Td>{order.paymentMethod}</Td>
                    <Td>{formatDate(order.paymentDate)}</Td>
                    <Td>{`${order.shippingCourier} - ${order.shippingService}`}</Td>
                    <Td>{formatDate(order.shippingDate)}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/admin/transactions/${order.id}`);
                          }}
                        >
                          Detail
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <TransactionsPagination
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
