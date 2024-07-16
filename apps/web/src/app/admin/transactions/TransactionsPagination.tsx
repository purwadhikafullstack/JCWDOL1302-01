import { Box, Icon, IconButton, Select } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Props = {
  data: any;
  filters: any;
  setFilters: any;
};

const TransactionsPagination = ({ data, filters, setFilters }: Props) => {
  return (
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
            setFilters((prevFilters: any) => ({
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
            setFilters((prevFilters: any) => ({
              ...prevFilters,
              page: Math.min(prevFilters.page + 1, data.pages),
            }))
          }
          isDisabled={filters.page === data.pages}
        />
      </Box>
    </Box>
  );
};

export default TransactionsPagination;
