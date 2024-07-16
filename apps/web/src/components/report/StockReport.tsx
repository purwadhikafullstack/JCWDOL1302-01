'use client';

import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Select,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import StockTableChart from './StockTableChart';
import { useAppSelector } from "@/lib/hooks";
import { getStores } from "@/services/store.service";
import { getStockReportDetail, getStockReportPerMonth } from "@/services/report.service";
import { monthLabels } from "@/constants/report.constant";

const StockReport: React.FC = () => {
  const [filters, setFilters] = useState({
    year: '2024',
    month: '',
    storeId: '',
    keyword: '',
    page: 1,
    size: 10,
  });
  const [stores, setStores] = useState<any[]>([]);
  const [monthDatasets, setMonthDatasets] = useState<any[]>([]);
  const [detailDatasets, setDetailDatasets] = useState({
    reports: [],
    pages: 1,
  });
  const user = useAppSelector((state) => state.auth.user);

  const yearOptions = Array.from({ length: 2030 - 2024 + 1 }, (_, index) => ({
    value: 2024 + index,
    label: (2024 + index).toString(),
  }));

  useEffect(() => {
    (async () => {
      const dataStores = await getStores({});
      setStores(dataStores?.stores);
    })();
  }, []);

  useEffect(() => {
    if (user.role === "store_admin" && user.storeId) {
      setFilters(prevFilters => ({ ...prevFilters, storeId: user.storeId as string }));
    }
  }, [user.role, user.storeId]);

  useEffect(() => {
    (async () => {
      const dataMonth = await getStockReportPerMonth(filters);
      setMonthDatasets(dataMonth);

      const dataDetail = await getStockReportDetail(filters);
      setDetailDatasets(dataDetail);
    })();
  }, [filters]);

  return (
    <Box>
      <Stack flex={'1'} justify={'center'} direction={'row'} spacing={2} mb={10}>
        <Box>
          <Text fontWeight={500}>Year:</Text>
          <Select
            value={filters.year}
            onChange={e => setFilters(prevFilters => ({ ...prevFilters, year: e.target.value }))}
          >
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
        {user.role === "super_admin" && (
          <Box>
            <Text fontWeight={500}>Store:</Text>
            <Select
              value={filters.storeId}
              onChange={e => setFilters(prevFilters => ({ ...prevFilters, storeId: e.target.value }))}
            >
              <option value="">- All Stores -</option>
              {stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </Select>
          </Box>
        )}
      </Stack>
      <Spacer />

      <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr">
        <GridItem colSpan={1}>
          <Box w="full" mb={-150}>
            <Text align="center" mb={5} fontWeight={500}>
              Laporan Stok Produk Per Bulan
            </Text>
            <AspectRatio>
              <BarChart
                labels={monthLabels}
                datasets={monthDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>

      <Box mt={{ base: 100, lg: 0 }}>
        <Text align="center" mb={10} fontWeight={500}>
          Detail Laporan Stok Produk
        </Text>
        <StockTableChart
          detailDatasets={detailDatasets}
          monthLabels={monthLabels}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </Box>
  );
};

export default StockReport;
