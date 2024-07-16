import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Image,
} from '@chakra-ui/react';

interface EwalletShippingMethod {
  imageSrc: string;
}

const EwalletshippingMethods: EwalletShippingMethod[] = [
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/gopay.png',
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/ovo.png',
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/dana.png',
  },
  {
    imageSrc:
      'https://shop.rehan.id/assets/images/payment-methods/shopeepay.png',
  },
];

export default function ShippingMethodPage() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<EwalletShippingMethod>();

  const handleMethodChange = (selectedMethod: any) => {
    setSelectedShippingMethod(selectedMethod);
  };

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Payment Method
      </Heading>

      <Stack spacing={8} w={'full'}>
        <Text fontSize={20}>E-Wallet</Text>
        <RadioGroup
          value={selectedShippingMethod?.imageSrc}
          onChange={handleMethodChange}
        >
          {EwalletshippingMethods.map((method, index) => (
            <Radio key={index}>
              <Flex mb={4} alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing="4">
                  <Image src={method.imageSrc} m={10} alt="" />
                  <Box></Box>
                </Stack>
              </Flex>
            </Radio>
          ))}
        </RadioGroup>
      </Stack>
    </Stack>
  );
}
