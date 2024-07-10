'use client';
import { Stack, Heading, Flex, Button, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const CartEmpty = () => {
  const router = useRouter();

  return (
    <Stack spacing={6} w={'full'} rounded={'xl'} mb={10} textAlign={'center'}>
      <Heading
        fontWeight={600}
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        lineHeight={'110%'}
      >
        Hey Guys!!
        <Text color={'red.600'} pt={4}>
          Your Cart Is Empty
        </Text>{' '}
        <Flex alignContent="center" justifyContent="center">
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://img.antaranews.com/cache/1200x800/2019/09/04/3.jpg.webp'
            }
            width={450}
            mt={5}
            borderRadius={10}
          />
        </Flex>
      </Heading>
      <Text color={'gray.500'}>
        <p>Well, if you dont want the PennyWise come to reminder you,</p>
        <p>We suggest you to order something...</p>
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
            router.push(`/products?category`);
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
  );
};

export default CartEmpty;
