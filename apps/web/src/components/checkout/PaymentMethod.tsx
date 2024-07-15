import React from 'react';
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateCartPaymentState } from '@/lib/features/cart/cartSlice';
import { ewallets, minimarkets, transferBanks, virtualAccounts } from "@/constants/payment.constant";

export default function PaymentMethod() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleChange = (paymentMethod: string) => {
    dispatch(updateCartPaymentState({ paymentMethod }));
  };

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Payment Method
      </Heading>

      <Stack spacing={8} w={'full'}>
        <RadioGroup value={cart.paymentMethod} onChange={handleChange}>
          <Box>
            <Box>
              <Heading as="h3" fontSize="md" color="#4A5568" flex='1' textAlign='left'>E-Wallet</Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} py={8}>
                {ewallets.map((method, index) => (
                  <Radio key={index} value={method.value}>
                    <Image src={method.image} alt={method.value} pl={2} />
                  </Radio>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Heading as="h3" fontSize="md" color="#4A5568" flex='1' textAlign='left'>Virtual Account</Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} py={8}>
                {virtualAccounts.map((method, index) => (
                  <Radio key={index} value={method.value}>
                    <Image src={method.image} alt={method.value} pl={2} />
                  </Radio>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Heading as="h3" fontSize="md" color="#4A5568" flex='1' textAlign='left'>Transfer Bank</Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} py={8}>
                {transferBanks.map((method, index) => (
                  <Radio key={index} value={method.value}>
                    <Box pl={2}>
                      <Image
                        width={90}
                        height={50}
                        src={method.image}
                        alt={method.value}
                      />
                    </Box>
                  </Radio>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Heading as="h3" fontSize="md" color="#4A5568" flex='1' textAlign='left'>Minimarket</Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} py={8}>
                {minimarkets.map((method, index) => (
                  <Radio key={index} value={method.value}>
                    <Image src={method.image} alt={method.value} pl={2} />
                  </Radio>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        </RadioGroup>
      </Stack>
    </Stack>
  );
}
