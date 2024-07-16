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
  IconButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  InputGroup,
  InputRightElement,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppSelector } from '@/lib/hooks';
import { getOrders } from '@/services/order.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { formatDate } from '@/utils/date';
import { endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaCalendarAlt } from "react-icons/fa";
import { ORDER_STATUS } from "@/constants/order.constant";

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
  const [filters, setFilters] = useState<any>({
    userId: user.id as string,
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
        Orders
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8} direction={{ base: "column", md: "row" }}>
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
              <option value={ORDER_STATUS.menungguPembayaran}>{ORDER_STATUS.menungguPembayaran}</option>
              <option value={ORDER_STATUS.menungguKonfirmasiPembayaran}>{ORDER_STATUS.menungguKonfirmasiPembayaran}</option>
              <option value={ORDER_STATUS.diproses}>{ORDER_STATUS.diproses}</option>
              <option value={ORDER_STATUS.dikirim}>{ORDER_STATUS.dikirim}</option>
              <option value={ORDER_STATUS.pesananDikonfirmasi}>{ORDER_STATUS.pesananDikonfirmasi}</option>
              <option value={ORDER_STATUS.dibatalkan}>{ORDER_STATUS.dibatalkan}</option>
            </Select>
            <Popover isOpen={showPicker} onClose={() => setShowPicker(false)}>
              <PopoverTrigger>
                <InputGroup>
                  <Input
                    onClick={() => setShowPicker(true)}
                    readOnly
                    value={`${format(range[0].startDate!, 'dd/MM/yyyy')} - ${format(range[0].endDate!, 'dd/MM/yyyy')}`}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Open date picker"
                      icon={<FaCalendarAlt />}
                      onClick={() => setShowPicker(!showPicker)}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  <DateRange
                    ranges={range}
                    onChange={handleRangeChange}
                    moveRangeOnFirstSelection={false}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Order Number</Th>
                  <Th>Order Date</Th>
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
                            router.push(`/users/orders/${order.id}`);
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
          <Box pt={4} display="flex" justifyContent="space-between">
            <Select
              width="auto"
              value={filters.size}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  size: parseInt(e.target.value),
                  page: 1,
                })
              }
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </Select>

            <Box display="flex">
              <IconButton
                aria-label="left"
                icon={<Icon as={FiChevronLeft} />}
                onClick={() =>
                  setFilters((prevFilters: any) => ({
                    ...prevFilters,
                    page: Math.max(prevFilters.page - 1, 1),
                  }))
                }
                isDisabled={filters.page === 1}
              />
              <Box p={2}>
                {filters.page} / {data.pages}
              </Box>
              <IconButton
                aria-label="right"
                icon={<Icon as={FiChevronRight} />}
                onClick={() =>
                  setFilters((prevFilters: any) => ({
                    ...prevFilters,
                    page: Math.min(prevFilters.page + 1, data.pages),
                  }))
                }
                isDisabled={filters.page === data.pages}
              />
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
