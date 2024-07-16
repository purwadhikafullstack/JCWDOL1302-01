'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Select,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  getStoreByID,
  getUnassignedUsersByStoreID,
  createUserStore,
} from '@/services/store.service';
import AssignedUsers from '@/components/stores/AssignedUsers';
import { toast } from 'react-toastify';

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const [users, setUnassignedUsers] = useState<any[]>([]);
  const [store, setStore] = useState<any>(null);

  const [formData, setFormData] = useState({
    userId: '',
    storeId: '',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getStoreByID(id);
      setStore(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        storeId: id,
      }));
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const data = await getUnassignedUsersByStoreID(id);
      setUnassignedUsers(data);
    })();
  }, [id]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const store = await createUserStore(formData);
      if (!store) throw new Error('Assign user store failed!');
      toast.success('Assign User store success');

      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: '',
      }));

      const data = await getUnassignedUsersByStoreID(id);
      setUnassignedUsers(data);
    } catch (err) {
      console.error(err);
      toast.error('Assign user store failed');
    }
  };

  return (
    <>
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Assign User to {store?.name}
        </Text>
        <Card my={10}>
          <CardBody>
            <TableContainer>
              <form onSubmit={handleSubmit}>
                <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                  <FormControl id="store">
                    <FormLabel>Store</FormLabel>
                    <Text as={'b'}>{store?.name}</Text>
                  </FormControl>
                  <FormControl id="user" isRequired>
                    <FormLabel>User</FormLabel>
                    <Select
                      width="auto"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.email}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                      onClick={() => {
                        router.push('/admin/stores');
                      }}
                      bg={'red.400'}
                      color={'white'}
                      w="full"
                      _hover={{
                        bg: 'red.500',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      w="full"
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Assign
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
      <AssignedUsers id={id} setUnassignedUsers={setUnassignedUsers} />
    </>
  );
};

export default Page;
