'use client';

import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import DropDownYear from './DropDownYear';
import DropDownStore from './DropDownStore';
import {
  getSalesReportPerCategory,
  getSalesReportPerMonth,
  getSalesReportPerProduct,
} from '@/services/report.service';
import TableChart from './TableChart';

// Sales Data Interface (replace with your actual data structure)
interface SalesData {
  month: string; // Month name
  revenue: number;
  expenses: number;
  profit: number;
  // Add more properties as needed
}

const salesData: SalesData[] = [
  // Replace with your actual sales data for each month
  { month: 'January', revenue: 10000, expenses: 5000, profit: 5000 },
  { month: 'February', revenue: 12000, expenses: 6000, profit: 6000 },
  { month: 'March', revenue: 15000, expenses: 7000, profit: 8000 },
  // ... data for remaining months
];

const DashboardSalesReport: React.FC = () => {
  const [monthDatasets, setMonthDatasets] = useState<any[]>([]);
  const [productDatasets, setProductDatasets] = useState<any[]>([]);
  const [categoryDatasets, setCategoryDatasets] = useState<any[]>([]);

  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // const monthDatasets = [
  //   {
  //     label: 'Penjualan',
  //     data: monthData,
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  // ];

  // const categoryDatasets = [
  //   {
  //     label: 'Sayur',
  //     data: monthLabels.map(() => 100),
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  //   {
  //     label: 'Daging',
  //     data: monthLabels.map(() => 200),
  //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //   },
  // ];

  // const productDatasets = [
  //   {
  //     label: 'Bayam',
  //     data: monthLabels.map(() => 100),
  //     borderColor: 'rgb(255, 99, 132)',
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  //   {
  //     label: 'Sapi',
  //     data: monthLabels.map(() => 200),
  //     borderColor: 'rgb(53, 162, 235)',
  //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //   },
  // ];

  const categoryLabels = categoryDatasets.map((item) => item.label);

  const productLabels = productDatasets.map((item) => item.label);

  const categoryPieDatasets = [
    {
      label: 'Penjualan',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ];

  const productPieDatasets = [
    {
      label: 'Penjualan',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ];

  useEffect(() => {
    (async () => {
      const dataMonth = await getSalesReportPerMonth({});
      setMonthDatasets(dataMonth);

      const dataProduct = await getSalesReportPerProduct({});
      setProductDatasets(dataProduct);

      const dataCategory = await getSalesReportPerCategory({});
      setCategoryDatasets(dataCategory);
    })();
  }, []);

  return (
    <Box>
      <Stack flex={'1'} justify={'center'} direction={'row'} spacing={2}>
        <DropDownYear
          yearNow={2024}
          onYearChange={function (year: number): void {
            throw new Error('Function not implemented.');
          }}
        />
        <DropDownStore />
      </Stack>
      <Spacer />

      {/* Charts Section */}
      <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          <GridItem colSpan={1}>
            <Box w="full" mb={-150}>
              <AspectRatio>
                <BarChart
                  title="Laporan Penjualan Per Bulan"
                  labels={monthLabels}
                  datasets={monthDatasets}
                />
              </AspectRatio>
            </Box>
          </GridItem>
        </Grid>
        <GridItem colSpan={1}>
          <Box w="full" mb={-150}>
            <AspectRatio>
              <BarChart
                title="Laporan Penjualan Per Kategori"
                labels={monthLabels}
                datasets={categoryDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <AspectRatio ratio={16 / 9}>
              <LineChart
                title="Laporan Penjualan Per Produk"
                labels={monthLabels}
                datasets={productDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>

      {/* Additional Charts (optional) */}

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5}>
              Penjualan Per Kategori
            </Text>{' '}
            <AspectRatio ratio={1}>
              <PieChart
                labels={categoryLabels}
                datasets={categoryPieDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5}>
              Penjualan Per Produk
            </Text>
            <AspectRatio ratio={1}>
              <PieChart labels={productLabels} datasets={productPieDatasets} />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>
      <TableChart />
    </Box>
  );
};

export default DashboardSalesReport;
