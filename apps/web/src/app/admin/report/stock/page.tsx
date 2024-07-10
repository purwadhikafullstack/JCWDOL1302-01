import StockReport from '@/components/sales/chart/StockReport';
import { Box, Card, CardBody, Text } from '@chakra-ui/react';
import React from 'react';

const page = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Stock Report
      </Text>
      <Card my={10}>
        <CardBody>
          <StockReport />
        </CardBody>
      </Card>
    </Box>
  );
};

export default page;
