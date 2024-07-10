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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getStoreByID } from '@/services/store.service';
import { getDiscountsByStoreID } from '@/services/discount.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { useAppSelector } from '@/lib/hooks';
import { DISCOUNT_TYPE } from "@/constants/discount.constant";

const Page = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [store, setStore] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!user.storeId) return;
      const resultStore = await getStoreByID(user.storeId);
      setStore(resultStore);
      const resultDiscounts = await getDiscountsByStoreID(user.storeId);
      setDiscounts(resultDiscounts);
    })();
  }, [user.storeId]);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount for Store &quot;{store?.name}&quot;
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
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
                {discounts?.map((discount: any, index: number) => (
                  <Tr key={discount.id}>
                    <Td>{index + 1}</Td>
                    <Td>{discount.type}</Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.buy1Get1,
                      ].includes(discount.type) ? discount.product?.name : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.minimumPurchase,
                        DISCOUNT_TYPE.referralCode,
                      ].includes(discount.type) ? (
                        discount.unit === 'Amount'
                          ? FormatCurrency(discount.amount)
                          : discount.amount + '%'
                      ) : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.productDiscount,
                        DISCOUNT_TYPE.minimumPurchase,
                        DISCOUNT_TYPE.referralCode,
                      ].includes(discount.type) ? discount.unit : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.minimumPurchase
                      ].includes(discount.type) ? FormatCurrency(discount.minimumPrice) : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.minimumPurchase
                      ].includes(discount.type) ? FormatCurrency(discount.maximumDiscount) : ''}
                    </Td>
                    <Td>
                      {[
                        DISCOUNT_TYPE.freeShipping
                      ].includes(discount.type) ? discount.minimumOrders : ''}
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
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;