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
import { deleteStore, getStores } from '@/services/store.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AddIcon } from "@chakra-ui/icons";

const Page = () => {
  const [data, setData] = useState({
    stores: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getStores(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete store ${name}?`) || !id) return;
    try {
      const store = await deleteStore(id);
      if (!store) throw new Error('Delete store failed');
      toast.success('Delete store success');

      const result = await getStores(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete store failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Store Management
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
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/admin/stores/create`);
              }}
              alignItems="center"
            >
              <AddIcon fontSize="0.75rem" mr={1.5} />
              Add
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Subdistrict</Th>
                  <Th>City</Th>
                  <Th>Province</Th>
                  <Th textAlign={'center'}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.stores?.map((store: any, index: number) => (
                  <Tr key={store.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{store.name}</Td>
                    <Td>{store.subdistrictName}</Td>
                    <Td>{store.cityName}</Td>
                    <Td>{store.provinceName}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            router.push(`/admin/stores/users/${store.id}`);
                          }}
                        >
                          Assign
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/admin/stores/edit/${store.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(store.id, store.name)}
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
