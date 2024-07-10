'use client';

import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutSummary } from './CheckoutSummary';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import PaymentMethod from './PaymentMethod';
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from './ShippingMethod';
import { getStoreByID } from "@/services/store.service";
import { getCouriers } from "@/services/shipping.service";
import { updateCartOriginState } from "@/lib/features/cart/cartSlice";
import VoucherList from "./VoucherList";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [store, setStore] = useState<any>(null);
  const [couriers, setCouriers] = useState<any[]>([]);

  // useEffect(() => {
  //   if (!cart.itemsCount) router.push("/cart");
  // }, [cart.itemsCount, router]);

  useEffect(() => {
    (async () => {
      if (!user.id || !cart.storeId) return;
      const data = await getStoreByID(cart.storeId);
      setStore(data);
      dispatch(updateCartOriginState({ origin: data?.subdistrictId }));
    })()
  }, [dispatch, user.id, cart.storeId]);

  useEffect(() => {
    (async () => {
      if (!cart.origin || !cart.destination) return;
      const data = await getCouriers(cart.origin, cart.destination);
      setCouriers(data);
    })()
  }, [cart.origin, cart.destination]);

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      mb={20}
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="3xl" fontWeight="extrabold" textAlign={'center'}>
            Checkout
          </Heading>
          <Divider />

          <Stack spacing={8}>
            <ShippingAddress store={store} />
            <Divider />
            <ShippingMethod couriers={couriers} />
            <Divider />
            <PaymentMethod />
          </Stack>
        </Stack>

        <Flex
          direction="column"
          align="center"
          flex="1"
          mt={{ base: 0, sm: 100 }}
          gap={6}
        >
          <VoucherList />
          <CheckoutSummary />
          <HStack fontWeight="semibold">
            <p>or</p>
            <Link
              style={{ color: "rgb(49, 130, 206)" }}
              href="/cart"
            >
              Back to Cart
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Checkout;
