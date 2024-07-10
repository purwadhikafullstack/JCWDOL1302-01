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
import { deleteAddress, getAddresses } from '@/services/address.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';

const Page = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState({
    addresses: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    userId: user.id as string,
    keyword: '',
    page: 1,
    size: 10,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getAddresses(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure want to delete address ${label}?`) || !id)
      return;
    try {
      const address = await deleteAddress(id);
      if (!address) throw new Error('Delete address failed');
      toast.success('Delete address success');

      const result = await getAddresses(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete address failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Address Management
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
                router.push(`/users/address/create`);
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
                  <Th>Label</Th>
                  <Th>Subdistrict</Th>
                  <Th>City</Th>
                  <Th>Province</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.addresses?.map((address: any, index: number) => (
                  <Tr key={address.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{address.label}</Td>
                    <Td>{address.subdistrictName}</Td>
                    <Td>{address.cityName}</Td>
                    <Td>{address.provinceName}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/users/address/edit/${address.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() =>
                            handleDelete(address.id, address.label)
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
