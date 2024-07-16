'use client';

import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getStoreByID } from '@/services/store.service';
import { deleteDiscount, getDiscounts } from '@/services/discount.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { useAppSelector } from '@/lib/hooks';
import { DISCOUNT_TYPE } from '@/constants/discount.constant';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DiscountBox from './DiscountBox';

const Page = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState({
    discounts: [],
    pages: 1,
  });
  const [store, setStore] = useState<any>();

  const [filters, setFilters] = useState({
    storeId: user.storeId,
    keyword: '',
    page: 1,
    size: 10,
  });

  useEffect(() => {
    (async () => {
      if (!user.storeId) return;
      const resultStore = await getStoreByID(user.storeId);
      setStore(resultStore);
      const resultDiscounts = await getDiscounts(filters);
      setData(resultDiscounts);
    })();
  }, [user.storeId, filters]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete discount ${name}?`) || !id)
      return;
    try {
      const discount = await deleteDiscount(id);
      if (!discount) throw new Error('Delete discount failed');
      toast.success('Delete discount success');

      const result = await getDiscounts(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete discount failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount for Store &quot;{store?.name}&quot;
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            <Input
              placeholder="Search..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value, page: 1 })
              }
            />
            <Input
              placeholder="Search..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value, page: 1 })
              }
            />
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/admin/discounts/create`);
              }}
            >
              Add
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Discount Type</Th>
                  <Th>Product</Th>
                  <Th>Amount</Th>
                  <Th>Unit</Th>
                  <Th>Minimum Total Price</Th>
                  <Th>Maximum Discount</Th>
                  <Th>Minimum Orders</Th>
                  <Th textAlign={'start'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody alignContent={'center'}>
                {data.discounts?.map((discount: any, index: number) => (
                  <Tr key={discount.id}>
                    <Td>{index + 1}</Td>
                    <Td>{discount.type}</Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.buy1Get1,
                      ].includes(discount.type)
                        ? discount.product?.name
                        : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.minimumPurchase,
                        DISCOUNT_TYPE.referralCode,
                      ].includes(discount.type)
                        ? discount.unit === 'Amount'
                          ? FormatCurrency(discount.amount)
                          : discount.amount + '%'
                        : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.minimumPurchase,
                        DISCOUNT_TYPE.referralCode,
                      ].includes(discount.type)
                        ? discount.unit
                        : ''}
                    </Td>
                    <Td>
                      {[DISCOUNT_TYPE.minimumPurchase].includes(discount.type)
                        ? FormatCurrency(discount.minimumPrice)
                        : ''}
                    </Td>
                    <Td>
                      {[DISCOUNT_TYPE.minimumPurchase].includes(discount.type)
                        ? FormatCurrency(discount.maximumDiscount)
                        : ''}
                    </Td>
                    <Td>
                      {[DISCOUNT_TYPE.freeShipping].includes(discount.type)
                        ? discount.minimumOrders
                        : ''}
                    </Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/admin/stores/discounts`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() =>
                            handleDelete(discount.id, discount.type)
                          }
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <DiscountBox data={data} setFilters={setFilters} filters={filters} />
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
