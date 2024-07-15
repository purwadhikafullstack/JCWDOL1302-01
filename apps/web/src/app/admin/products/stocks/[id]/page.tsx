'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
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
  IconButton,
  Icon,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getStocks } from '@/services/stock.service';
import { getProductByID } from '@/services/product.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppSelector } from '@/lib/hooks';
import { AddIcon } from "@chakra-ui/icons";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState({
    stocks: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    storeId: user.storeId as string,
    productId: id,
    keyword: '',
    page: 1,
    size: 10,
  });

  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getStocks(filters);
      setData(result);
    })();
  }, [filters]);

  useEffect(() => {
    (async () => {
      const resultProduct = await getProductByID(id);
      setProduct(resultProduct);
    })();
  }, [id]);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Stock for Product &quot;{product?.name}&quot;
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            {user?.role === 'super_admin' && (
              <Input
                placeholder="Search..."
                value={filters.keyword}
                onChange={(e) =>
                  setFilters({ ...filters, keyword: e.target.value, page: 1 })
                }
              />
            )}
            {user?.role === 'store_admin' && data.stocks.length > 0 ? (
              <></>
            ) : (
              <Button
                colorScheme="blue"
                onClick={() => {
                  router.push(`/admin/products/stocks/${id}/create`);
                }}
                alignItems="center"
              >
                <AddIcon fontSize="0.75rem" mr={1.5} />
                Add
              </Button>
            )}
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Store Name</Th>
                  <Th>Base Stock</Th>
                  <Th>Used Stock</Th>
                  <Th>Remaining Stock</Th>
                  <Th textAlign={'start'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody alignContent={'center'}>
                {data.stocks?.map((stock: any, index: number) => (
                  <Tr key={stock.id}>
                    <Td>{index + 1}</Td>
                    <Td>{stock.store.name}</Td>
                    <Td>{stock.baseStock}</Td>
                    <Td>{stock.usedStock}</Td>
                    <Td>{stock.remainingStock}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(
                              `/admin/products/stocks/${stock.id}/edit`,
                            );
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
          {user?.role === 'super_admin' && (
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
                    setFilters((prevFilters) => ({
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
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      page: Math.min(prevFilters.page + 1, data.pages),
                    }))
                  }
                  isDisabled={filters.page === data.pages}
                />
              </Box>
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
