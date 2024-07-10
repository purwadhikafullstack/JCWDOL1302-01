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
  Select,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { deleteProduct, getProducts } from '@/services/product.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';

const Page = () => {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10,
  });
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    (async () => {
      const result = await getProducts(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete product ${name}?`) || !id) return;
    try {
      const product = await deleteProduct(id);
      if (!product) throw new Error('Delete product failed');
      toast.success('Delete product success');

      const result = await getProducts(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete product failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Product Management
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
            {user?.role === 'super_admin' && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  router.push(`/admin/products/create`);
                }}
              >
                Add
              </Button>
            )}
          </Flex>
          <TableContainer>
            <Table variant="striped" justifyContent={'center'}>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th textAlign={'center'}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.products?.map((product: any, index: number) => (
                  <Tr key={product.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category.name}</Td>
                    <Td>{FormatCurrency(product.price)}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/admin/products/stocks/${product.id}`);
                          }}
                        >
                          Stock
                        </Button>
                        {user?.role === 'super_admin' && (
                          <>
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                router.push(
                                  `/admin/products/image/${product.id}`,
                                );
                              }}
                            >
                              Images
                            </Button>
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                router.push(
                                  `/admin/products/edit/${product.id}`,
                                );
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() =>
                                handleDelete(product.id, product.name)
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
