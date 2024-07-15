'use client';

import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Input,
  Select,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatDate } from "@/utils/date";

type Filters = {
  year: string;
  month: string;
  storeId: string;
  keyword: string;
  page: number;
  size: number;
}

type Props = {
  detailDatasets: {
    reports: any[];
    pages: number;
  };
  monthLabels: string[],
  filters: Filters;
  setFilters: (filters: any) => void;
}

const StockTableChart = ({ detailDatasets, monthLabels, filters, setFilters }: Props) => {
  return (
    <Box>
      <Flex gap={4} pb={8} direction={{ base: 'column', md: 'row' }}>
        <Input
          placeholder="Search..."
          value={filters.keyword}
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value, page: 1 })
          }
        />
        <Select
          value={filters.month}
          onChange={e => setFilters((prevFilters: any) => ({ ...prevFilters, month: e.target.value }))}
        >
          <option value="">- All Months -</option>
          {monthLabels.map((month, index) => (
            <option key={index} value={String(index + 1).padStart(2, '0')}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Product</Th>
              <Th>Store</Th>
              <Th>Stock</Th>
              <Th>Type</Th>
              <Th>Created By</Th>
              <Th>Created Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detailDatasets?.reports?.map((report: any, index: number) => (
              <Tr key={report.id}>
                <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                <Td>{report.stockProduct?.product?.name}</Td>
                <Td>{report.stockProduct?.store?.name}</Td>
                <Td>{report.stock}</Td>
                <Td>{report.type === 'tambah' ? 'Penambahan' : 'Pengurangan'}</Td>
                <Td>{report.createdByUser?.name}</Td>
                <Td>{formatDate(report.createdDate)}</Td>
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
              setFilters((prevFilters: any) => ({
                ...prevFilters,
                page: Math.max(prevFilters.page - 1, 1),
              }))
            }
            isDisabled={filters.page === 1}
          />
          <Box p={2}>
            {filters.page} / {detailDatasets?.pages}
          </Box>
          <IconButton
            aria-label="right"
            icon={<Icon as={FiChevronRight} />}
            onClick={() =>
              setFilters((prevFilters: any) => ({
                ...prevFilters,
                page: Math.min(prevFilters.page + 1, detailDatasets?.pages),
              }))
            }
            isDisabled={filters.page === detailDatasets?.pages}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StockTableChart;
