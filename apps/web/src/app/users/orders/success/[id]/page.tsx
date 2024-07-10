'use client';

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
  Container,
  Heading,
  Flex,
  Image,
} from '@chakra-ui/react';
import { getOrderByID } from '@/services/order.service';
import { updatePaymentStatus } from '@/services/payment.service';
import { useRouter } from 'next/navigation';
import { ORDER_STATUS } from '@/constants/order.constant';

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let data = await getOrderByID(id);

      if (data.orderStatus === ORDER_STATUS.menungguPembayaran) {
        const formData = { orderStatus: ORDER_STATUS.diproses };
        await updatePaymentStatus(id, formData);

        data = await getOrderByID(id);
        setOrder(data);
      } else {
        router.push(`/users/orders/${id}`);
      }
    })();
  }, [id, router]);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Order {`"${order?.orderNumber}"`}
      </Text>
      <Card my={10}>
        <CardBody>
          <Stack
            spacing={6}
            w={'full'}
            rounded={'xl'}
            p={10}
            my={6}
            textAlign={'center'}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
              lineHeight={'110%'}
            >
              Dear {order?.user.name || order?.user.email}
              <Text color={'green.400'} pt={4}>
                Your Payment is Success!
              </Text>
              <Flex alignContent="center" justifyContent="center">
                <Image
                  rounded={'md'}
                  alt={'feature image'}
                  src={
                    'https://niceillustrations.com/wp-content/uploads/2021/03/Successful-Payment-color-800px.png'
                  }
                  width={250}
                />
              </Flex>
            </Heading>
            <Text color={'gray.500'}>
              <p>We have received your payment for this order.</p>
              <p>Your order will be will be processed shortly.</p>
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <Button
                onClick={() => {
                  router.push(`/users/orders`);
                }}
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
