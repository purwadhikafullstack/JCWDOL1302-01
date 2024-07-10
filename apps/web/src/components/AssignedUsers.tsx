'use client';

import {
  Button,
  ButtonGroup,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  deleteUserStore,
  getUnassignedUsersByStoreID,
  getUserStores,
} from '@/services/store.service';
import { toast } from 'react-toastify';

type Props = { id: string; setUnassignedUsers: (stores: any[]) => void };

const AssignedUsers = ({ id: storeId, setUnassignedUsers }: Props) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getUserStores(storeId);
      setUsers(data);
    })();
  }, [storeId]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete user store ${name}?`) || !id)
      return;
    try {
      const store = await deleteUserStore(id);
      if (!store) throw new Error('Delete user store failed');
      toast.success('Delete user store success');

      const result = await getUserStores(storeId);
      setUsers(result);

      const data = await getUnassignedUsersByStoreID(storeId);
      setUnassignedUsers(data);
    } catch (err) {
      console.error(err);
      toast.error('Delete user store failed');
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" justifyContent={'center'}>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>User</Th>
              <Th textAlign={'center'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index: number) => (
              <Tr key={user.user.id}>
                <Td>{index + 1}</Td>
                <Td>{user.user.email}</Td>
                <Td textAlign={'center'}>
                  <ButtonGroup>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(user.id, user.user.name)}
                    >
                      Unassign
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AssignedUsers;
