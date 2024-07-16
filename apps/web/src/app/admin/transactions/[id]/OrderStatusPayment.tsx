import {
  Button,
  Card,
  FormControl,
  FormLabel,
  SimpleGrid,
  Stack,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ORDER_STATUS } from '@/constants/order.constant';

type Props = {
  order: any;
  handleReject: any;
  handleVerify: any;
  handleCancel: any;
  handleSend: any;
};

const OrderStatusPayment = ({
  order,
  handleReject,
  handleVerify,
  handleCancel,
  handleSend,
}: Props) => {
  const router = useRouter();

  return (
    <Card my={10}>
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
    </Card>
  );
};

export default OrderStatusPayment;
