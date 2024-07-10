'use client';

import { useAppSelector } from "@/lib/hooks";
import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from "next/navigation";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;

  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartSummary = () => {
  const cart = useAppSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <></>;

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Product Subtotal" value={FormatCurrency(cart.itemsPrice!)} />
        {cart.itemsDiscount && (
          <OrderSummaryItem label="Product Discount" value={FormatCurrency(-cart.itemsDiscount!)} />
        )}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {FormatCurrency(cart.totalPrice!)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={() => {
          router.push("/checkout")
        }}
      >
        Checkout
      </Button>
    </Stack>
  );
};
