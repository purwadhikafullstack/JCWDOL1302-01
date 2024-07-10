'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import DashboardSalesReport from '@/components/sales/chart/SalesReport';

const Page = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Sales Report
      </Text>
      <Card my={10}>
        <CardBody>
          <DashboardSalesReport />
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
