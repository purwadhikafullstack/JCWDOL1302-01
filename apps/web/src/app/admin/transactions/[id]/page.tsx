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
import { createPayment, updatePaymentStatus } from '@/services/payment.service';
import { toast } from 'react-toastify';
import { ORDER_STATUS } from '@/constants/order.constant';
import { sendOrder } from '@/services/shipping.service';
import { formatDate } from '@/utils/date';

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

  const OrderContent = ({
    id,
    label,
    value,
  }: {
    id?: string;
    label?: string;
    value?: string | ReactNode;
  }) => (
    <FormControl id={id}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        spacing={{ base: 0, sm: 0, md: 10 }}
        alignItems="center"
      >
        <FormLabel>{label}</FormLabel>
        <Text gridColumn={{ base: 'unset', sm: 'unset', md: '2/-1' }}>
          {value}
        </Text>
      </SimpleGrid>
    </FormControl>
  );

  const OrderStatus = ({
    text,
    status,
  }: {
    text: string;
    status: "error" | "info" | "warning" | "success";
  }) => (
    <Alert status={status} width="auto" display="inline-flex" borderRadius={10}>
      <AlertIcon />
      {text}
    </Alert>
  );

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Order {`"${order?.orderNumber}"`}
      </Text>
      <Card my={10}>
        <CardBody>
          <Stack spacing={4} w={'full'} rounded={'xl'} p={10} my={6}>
            <OrderContent
              id="name"
              label="Name"
              value={order?.user.name || '-'}
            />
            <OrderContent id="email" label="Email" value={order?.user.email} />
            <OrderContent
              id="phone"
              label="Phone"
              value={order?.user.phone || '-'}
            />
            <OrderContent
              id="address"
              label="Address"
              value={`${order?.userAddress.address}, ${order?.userAddress.subdistrictName}, ${order?.userAddress.cityName}, ${order?.userAddress.provinceName} ${order?.userAddress.postalCode || ''}`}
            />
            <OrderContent
              id="store"
              label="Store"
              value={order?.store.name || '-'}
            />
            <OrderContent
              id="itemsPrice"
              label="Product Subtotal"
              value={FormatCurrency(order?.itemsPrice)}
            />
            <OrderContent
              id="shippingPrice"
              label="Shipping Subtotal"
              value={FormatCurrency(order?.shippingPrice)}
            />
            {order?.itemsDiscount && (
              <OrderContent
                id="itemsDiscount"
                label="Product Discount"
                value={FormatCurrency(-order?.itemsDiscount)}
              />
            )}
            {order?.shippingDiscount && (
              <OrderContent
                id="shippingDiscount"
                label="Shipping Discount"
                value={FormatCurrency(-order?.shippingDiscount)}
              />
            )}
            {order?.voucherDiscount && (
              <OrderContent
                id="voucherDiscount"
                label="Voucher Discount"
                value={FormatCurrency(-order?.voucherDiscount)}
              />
            )}
            {order?.referralDiscount && (
              <OrderContent
                id="referralDiscount"
                label="Referral Discount"
                value={FormatCurrency(-order?.referralDiscount)}
              />
            )}
            <OrderContent
              id="totalPrice"
              label="Total Price"
              value={FormatCurrency(order?.totalPrice)}
            />
            <OrderContent
              id="orderDate"
              label="Order Date"
              value={formatDate(order?.orderDate)}
            />
            <OrderContent
              id="paymentMethod"
              label="Payment Method"
              value={order?.paymentMethod}
            />
            <OrderContent
              id="paymentDate"
              label="Payment Date"
              value={formatDate(order?.paymentDate) || '-'}
            />
            <OrderContent
              id="shippingMethod"
              label="Shipping Method"
              value={`${order?.shippingCourier} - ${order?.shippingService}`}
            />
            <OrderContent
              id="shippingDate"
              label="Shipping Date"
              value={formatDate(order?.shippingDate) || '-'}
            />
            <OrderContent
              id="orderStatus"
              label="Order Status"
              value={[
                ORDER_STATUS.menungguPembayaran,
                ORDER_STATUS.menungguKonfirmasiPembayaran,
              ].includes(order?.orderStatus) ? (
                <OrderStatus status='warning' text={order?.orderStatus} />
              ) : [
                ORDER_STATUS.diproses,
                ORDER_STATUS.dikirim,
              ].includes(order?.orderStatus) ? (
                <OrderStatus status='info' text={order?.orderStatus} />
              ) : [
                ORDER_STATUS.dibatalkan,
              ].includes(order?.orderStatus) ? (
                <OrderStatus status='error' text={order?.orderStatus} />
              ) : (
                <OrderStatus status='success' text={order?.orderStatus} />
              )}
            />

            {order?.paymentMethod === 'BANK' && order?.paymentImage && (
              <FormControl id="orderStatus" mt={5}>
                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 3 }}
                  spacing={{ base: 0, sm: 0, md: 10 }}
                >
                  <FormLabel>Payment Proof</FormLabel>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/confirmation/${order?.paymentImage}`}
                    style={{ height: 300 }}
                    alt="Payment Proof"
                  />
                </SimpleGrid>
              </FormControl>
            )}

            {order?.orderStatus &&
            order?.orderStatus === ORDER_STATUS.menungguKonfirmasiPembayaran ? (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={handleReject}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}
                >
                  Reject Order
                </Button>
                <Button
                  onClick={handleVerify}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Verify Order
                </Button>
              </Stack>
            ) : order?.orderStatus === ORDER_STATUS.diproses ? (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={() => {
                    router.push(`/admin/transactions`);
                  }}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleCancel}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  onClick={handleSend}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Send Order
                </Button>
              </Stack>
            ) : (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={() => {
                    router.push(`/admin/transactions`);
                  }}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Back
                </Button>
              </Stack>
            )}
          </Stack>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Quantity</Th>
                  <Th>Bonus Quantity</Th>
                  <Th>Price</Th>
                  <Th>Discount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order?.orderItems?.map((item: any, index: number) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.bonusQuantity > 0 && item.bonusQuantity}</Td>
                    <Td>{FormatCurrency(item.price)}</Td>
                    <Td>{item.discount > 0 && FormatCurrency(-item.discount)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
