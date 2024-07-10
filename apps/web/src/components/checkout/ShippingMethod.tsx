"use client";

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FormatCurrency } from "@/utils/FormatCurrency";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartShippingState } from "@/lib/features/cart/cartSlice";

interface ShippingMethod {
  name: string;
  deliveryTime: string;
  price: number;
}

type Props = {
  couriers: any[],
}

export default function ShippingMethod({ couriers = [] }: Props) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleChange = (value: string) => {
    const shippingCourier = value.split('|')[0] || '';
    const shippingService = value.split('|')[1] || '';
    const shippingPrice = Number(value.split('|')[2]) || 0;

    dispatch(updateCartShippingState({
      shippingCourier,
      shippingService,
      shippingPrice,
    }));
  }

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Shipping Method
      </Heading>

      {cart.userAddressId ? (
        <Stack
          spacing={8}
          w={'full'}
        >
          <RadioGroup onChange={handleChange}>
            {couriers.map((courier, index) => (
              <Box key={index} mb={6}>
                <Heading as="h3" fontSize="md" mb={4}>
                  {courier.name}
                </Heading>
                {courier.costs.map((service: any, index: number) => (
                  <Flex key={index} justifyContent="space-between" mb={2}>
                    <Radio
                      size='md'
                      colorScheme='green'
                      value={`${courier.code.toUpperCase()}|${service.service}|${service.cost[0].value}`}
                      checked={
                        cart.shippingCourier === courier.code.toUpperCase() &&
                        cart.shippingService === service.service
                      }
                    >
                      {`${service.description} (${service.cost[0].etd} days)`}
                    </Radio>
                    <Text>
                      {FormatCurrency(service.cost[0].value)}
                    </Text>
                  </Flex>
                ))}
              </Box>
            ))}
          </RadioGroup>
        </Stack>
      ) : (
        <Alert status='info' borderRadius={5} mt={4}>
          <AlertIcon />
          Please select label address first!
        </Alert>
      )}
    </Stack>
  );
}