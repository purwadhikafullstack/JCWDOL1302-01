import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  data: any;
  filters: any;
  router: any;
  user: any;
  handleDelete: any;
};

const TableProducts = (
  { data, filters, router, user, handleDelete }: Props,
  {},
) => {
  return (
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
                          router.push(`/admin/products/image/${product.id}`);
                        }}
                      >
                        Images
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          router.push(`/admin/products/edit/${product.id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(product.id, product.name)}
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
  );
};

export default TableProducts;
