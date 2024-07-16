'use client';

import { Card, CardBody, Box, Text } from '@chakra-ui/react';
import SalesReport from '@/components/report/SalesReport';

const Page = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Sales Report
      </Text>
      <Card my={10}>
        <CardBody>
          <SalesReport />
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
