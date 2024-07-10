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
import { deleteUser, getUsers } from '@/services/user.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/date';
import { USER_ROLE } from "@/constants/user.constant";

const Page = () => {
  const [data, setData] = useState({
    users: [],
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
      const result = await getUsers(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure want to delete user ${email}?`) || !id) return;
    try {
      const user = await deleteUser(id);
      if (!user) throw new Error('Delete user failed');
      toast.success('Delete user success');

      const result = await getUsers(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Delete user failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        User Management
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
                router.push(`/admin/users/create`);
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
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Role</Th>
                  <Th>Created at</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.users?.map((user: any, index: number) => (
                  <Tr key={user.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{USER_ROLE[user.role.name]}</Td>
                    <Td>{formatDate(user.createdDate)}</Td>
                    <Td>
                      {user.role.name === 'store_admin' && (
                        <ButtonGroup>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              router.push(`/admin/users/edit/${user.id}`);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(user.id, user.email)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      )}
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
