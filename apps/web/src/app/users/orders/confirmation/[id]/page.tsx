"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Box,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
} from '@chakra-ui/react';
import { getOrderByID } from "@/services/order.service";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { confirmPayment, updatePaymentStatus } from "@/services/payment.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "@/constants/order.constant";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let data = await getOrderByID(id);
      setOrder(data);

      if (data.orderStatus && data.orderStatus !== ORDER_STATUS.menungguPembayaran) {
        router.push(`/users/orders/${id}`);
      }
    })()
  }, [id, router]);

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      const inputFile = document.getElementById("paymentImage") as HTMLInputElement;
      formData.append("paymentImage", inputFile?.files?.item(0) as File);

      await confirmPayment(id, formData);
      toast.success("Confirmation Payment Success");
      router.push(`/users/orders/${id}`);
    } catch (err) {
      toast.error("Confirmation Payment Failed");
    }
  }

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Confirmation Order {`"${order?.orderNumber}"`}
      </Text>
      <Card my={10}>
        <CardBody>
          <Stack
            spacing={6}
            w={'full'}
            rounded={'xl'}
            p={10}
            my={6}
          >
            <FormControl id="name">
              <Text textAlign="center"><strong>{order?.user.name},</strong> thank you for purchase our products.</Text>
            </FormControl>
            <FormControl id="totalPrice">
              <Text textAlign="center">Please transfer <strong>{FormatCurrency(order?.totalPrice)}</strong> to below account number.
              </Text>
            </FormControl>
            <FormControl id="accountNumber">
              <Text textAlign="center"><strong>Bank Mandiri (126.000.1234.5678)</strong>
              </Text>
            </FormControl>
            <FormControl id="proof" mt={10}>
              <FormLabel>Payment Proof</FormLabel>
              <Input
                id="paymentImage"
                name="paymentImage"
                _placeholder={{ color: 'gray.500' }}
                type="file"
              />
            </FormControl>
            {order?.orderStatus && order?.orderStatus === ORDER_STATUS.menungguPembayaran && (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={() => {
                    router.push(`/users/orders/${id}`)
                  }}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Confirm Payment
                </Button>
              </Stack>
            )}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;