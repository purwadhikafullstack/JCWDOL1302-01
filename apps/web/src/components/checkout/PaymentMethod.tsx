import React from 'react';
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Image,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartPaymentState } from "@/lib/features/cart/cartSlice";

interface IPaymentMethod {
  value: string;
  image: string;
}

const ewallets: IPaymentMethod[] = [
  {
    value: 'GOPAY',
    image: 'https://shop.rehan.id/assets/images/payment-methods/gopay.png',
  },
  {
    value: 'OVO',
    image: 'https://shop.rehan.id/assets/images/payment-methods/ovo.png',
  },
  {
    value: 'DANA',
    image: 'https://shop.rehan.id/assets/images/payment-methods/dana.png',
  },
  {
    value: 'SHOPEEPAY',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/shopeepay.png',
  },
];

const virtualAccounts: IPaymentMethod[] = [
  {
    value: 'BCA',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bca.png',
  },
  {
    value: 'BNI',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bni.png',
  },
  {
    value: 'BRI',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bri.png',
  },
  {
    value: 'BSI',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/bsi.png',
  },
  {
    value: 'MANDIRI',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/mandiri.png',
  },
  {
    value: 'PERMATA',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/permata.png',
  },
];

const transferBanks: IPaymentMethod[] = [
  {
    value: 'BANK',
    image: 'https://www.bankeka.co.id/assets/img/layanan/logo-atm-bersama.png',
  },
];

const minimarkets: IPaymentMethod[] = [
  {
    value: 'ALFAMART',
    image: 'https://shop.rehan.id/assets/images/payment-methods/alfamart.png',
  },
  {
    value: 'INDOMARET',
    image: 'https://shop.rehan.id/assets/images/payment-methods/indomaret.png',
  },
];

export default function PaymentMethod() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleChange = (paymentMethod: string) => {
    dispatch(updateCartPaymentState({ paymentMethod }));
  }

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Payment Method
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <RadioGroup
          value={cart.paymentMethod} onChange={handleChange}>
          <Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h3" fontSize="md" flex='1' textAlign='left'>E-Wallet</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={8}>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
                  {ewallets.map((method, index) => (
                    <Radio key={index} value={method.value}>
                      <Image src={method.image} alt={method.value} pl={2} />
                    </Radio>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading as="h3" fontSize="md" flex='1' textAlign='left'>Virtual Account</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={8}>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
                  {virtualAccounts.map((method, index) => (
                    <Radio key={index} value={method.value}>
                      <Image src={method.image} alt={method.value} pl={2} />
                    </Radio>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading as="h3" fontSize="md" flex='1' textAlign='left'>Transfer Bank</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={8}>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
                  {transferBanks.map((method, index) => (
                    <Radio key={index} value={method.value}>
                      <Box pl={2}>
                        <Image width={90} height={25} src={method.image} alt={method.value} />
                      </Box>
                    </Radio>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading as="h3" fontSize="md" flex='1' textAlign='left'>Minimarket</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={8}>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
                  {minimarkets.map((method, index) => (
                    <Radio key={index} value={method.value}>
                      <Image src={method.image} alt={method.value} pl={2} />
                    </Radio>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </RadioGroup>
      </Stack>
    </Stack>
  );
}
