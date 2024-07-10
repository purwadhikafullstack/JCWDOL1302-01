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
import { deleteCategory, getCategories } from '@/services/category.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';

const Page = () => {
  const [data, setData] = useState({
    categories: [],
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
      const result = await getCategories(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete category ${name}?`) || !id)
      return;
    try {
      const category = await deleteCategory(id);
      if (!category) throw new Error('Delete category failed');
      toast.success('Delete category success');

      const result = await getCategories(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete category failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Category Management
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
                  router.push(`/admin/categories/create`);
                }}
              >
                Add
              </Button>
            )}
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Slug</Th>
                  {user?.role === 'super_admin' && <Th>Action</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data.categories?.map((category: any, index: number) => (
                  <Tr key={category.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{category.name}</Td>
                    <Td>{category.slug}</Td>
                    {user?.role === 'super_admin' && (
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              router.push(
                                `/admin/categories/edit/${category.id}`,
                              );
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() =>
                              handleDelete(category.id, category.name)
                            }
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Td>
                    )}
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
