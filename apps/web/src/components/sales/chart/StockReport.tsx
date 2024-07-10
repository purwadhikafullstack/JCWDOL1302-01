'use client';

import React from 'react';
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
import TableChart from './TableChart';

// Sales Data Interface (replace with your actual data structure)
interface SalesData {
  month: string; // Month name
  revenue: number;
  expenses: number;
  profit: number;
  // Add more properties as needed
}

const DashboardSalesReport: React.FC = () => {
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

  const monthDatasets = [
    {
      label: 'Penjualan',
      data: monthLabels.map(() => 100),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ];

  const categoryDatasets = [
    {
      label: 'Sayur',
      data: monthLabels.map(() => 100),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Daging',
      data: monthLabels.map(() => 200),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  const productDatasets = [
    {
      label: 'Bayam',
      data: monthLabels.map(() => 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Sapi',
      data: monthLabels.map(() => 200),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  const categoryLabels = [
    'Sayur',
    'Buah',
    'Daging',
    'Minyak',
    'Garam',
    'Telur',
  ];

  const productLabels = [
    'Cap Kaki Naga',
    'Cap Buah Khuldi',
    'Daging Semut Abadi',
    'Minyak Cap Keikhlasan',
    'Garam Anti Miskin',
    'Telur Dinosaurus Gede Sebelah',
  ];

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
        <GridItem colSpan={1}>
          <Box w="full" mb={-150}>
            <AspectRatio>
              <BarChart
                title="Laporan Stok Produk Pebulan"
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
      <TableChart />
    </Box>
  );
};

export default DashboardSalesReport;
