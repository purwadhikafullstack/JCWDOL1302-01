'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  SimpleGrid,
  Alert,
  AlertIcon,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getOrderByID } from '@/services/order.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { updatePaymentStatus } from '@/services/payment.service';
import { toast } from 'react-toastify';
import { ORDER_STATUS } from '@/constants/order.constant';
import { sendOrder } from '@/services/shipping.service';
import { formatDate } from '@/utils/date';
import OrderDetails from './OrderDetails';
import OrderStatusPayment from './OrderStatusPayment';
import OrderContents from './OrderContents';

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getOrderByID(id);
      setOrder(data);
    })();
  }, [id]);

  const handleVerify = async () => {
    try {
      const formData = { orderStatus: ORDER_STATUS.diproses };
      const order = await updatePaymentStatus(id, formData);
      if (!order?.id) throw new Error('Verify order failed');

      const data = await getOrderByID(id);
      setOrder(data);
      toast.success('Verify order success');
    } catch (err) {
      toast.error('Verify order failed');
    }
  };

  const handleSend = async () => {
    try {
      const order = await sendOrder(id);
      if (!order?.id) throw new Error('Send order failed');

      const data = await getOrderByID(id);
      setOrder(data);
      toast.success('Send order success');
    } catch (err) {
      toast.error('Send order failed');
    }
  };

  const handleReject = async () => {
    try {
      const formData = { orderStatus: ORDER_STATUS.menungguPembayaran };
      const order = await updatePaymentStatus(id, formData);
      if (!order?.id) throw new Error('Reject order failed');

      const data = await getOrderByID(id);
      setOrder(data);
      toast.success('Reject order success');
    } catch (err) {
      toast.error('Reject order failed');
    }
  };

  const handleCancel = async () => {
    try {
      const formData = { orderStatus: ORDER_STATUS.dibatalkan };
      const order = await updatePaymentStatus(id, formData);
      if (!order?.id) throw new Error('Cancel order failed');

      const data = await getOrderByID(id);
      setOrder(data);
      toast.success('Cancel order success');
    } catch (err) {
      toast.error('Cancel order failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Order {`"${order?.orderNumber}"`}
      </Text>
      <Card my={10}>
        <CardBody>
          <Stack spacing={4} w={'full'} rounded={'xl'} p={10} my={6}>
            <OrderContents order={order} />
            <OrderStatusPayment
              order={order}
              handleReject={handleReject}
              handleVerify={handleVerify}
              handleCancel={handleCancel}
              handleSend={handleSend}
            />
          </Stack>
          <OrderDetails order={order} />
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
