'use client';

import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
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
import {
  getSalesReportPerCategory,
  getSalesReportPerMonth,
  getSalesReportPerProduct,
  getSalesReportTotalCategory,
  getSalesReportTotalProduct,
} from '@/services/report.service';
import { getStores } from "@/services/store.service";
import { useAppSelector } from "@/lib/hooks";
import { monthLabels } from "@/constants/report.constant";

const DashboardSalesReport: React.FC = () => {
  const [filters, setFilters] = useState({
    year: '2024',
    storeId: '',
  });
  const [stores, setStores] = useState<any[]>([]);
  const [monthDatasets, setMonthDatasets] = useState<any[]>([]);
  const [productDatasets, setProductDatasets] = useState<any[]>([]);
  const [categoryDatasets, setCategoryDatasets] = useState<any[]>([]);
  const [totalProductDatasets, setTotalProductDatasets] = useState<any[]>([]);
  const [totalCategoryDatasets, setTotalCategoryDatasets] = useState<any[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  const yearOptions = Array.from({ length: 2030 - 2024 + 1 }, (_, index) => ({
    value: 2024 + index,
    label: (2024 + index).toString(),
  }));

  const categoryLabels = categoryDatasets.map((item) => item.label);

  const productLabels = productDatasets.map((item) => item.label);

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
      const dataMonth = await getSalesReportPerMonth(filters);
      setMonthDatasets(dataMonth);

      const dataProduct = await getSalesReportPerProduct(filters);
      setProductDatasets(dataProduct);

      const dataCategory = await getSalesReportPerCategory(filters);
      setCategoryDatasets(dataCategory);

      const dataTotalProduct = await getSalesReportTotalProduct(filters);
      setTotalProductDatasets(dataTotalProduct);

      const dataTotalCategory = await getSalesReportTotalCategory(filters);
      setTotalCategoryDatasets(dataTotalCategory);
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
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          <GridItem colSpan={1}>
            <Box w="full" mb={{ base: 0, lg: "-150px" }}>
              <Text align="center" mb={5} fontWeight={500}>
                Laporan Penjualan Per Bulan
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
        <GridItem colSpan={1}>
          <Box w="full" mb={{ base: 0, lg: "-150px" }}>
            <Text align="center" mb={5} fontWeight={500}>
              Laporan Penjualan Per Kategori
            </Text>
            <AspectRatio>
              <BarChart
                labels={monthLabels}
                datasets={categoryDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5} fontWeight={500}>
              Laporan Penjualan Per Produk
            </Text>
            <AspectRatio ratio={16 / 9}>
              <LineChart
                labels={monthLabels}
                datasets={productDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5} fontWeight={500}>
              Total Penjualan Per Kategori
            </Text>
            <AspectRatio ratio={1}>
              <PieChart
                labels={categoryLabels}
                datasets={totalCategoryDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5} fontWeight={500}>
              Total Penjualan Per Produk
            </Text>
            <AspectRatio ratio={1}>
              <PieChart
                labels={productLabels}
                datasets={totalProductDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardSalesReport;
