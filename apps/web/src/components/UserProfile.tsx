'use client';

import {
  Flex,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

export default function UserProfile(): JSX.Element {
  // Replace these with your actual user data
  const name = 'John Doe';
  const email = 'john.doe@example.com';
  const gender = 'HomeLander';
  const birthdate = '12 April 1999';
  const domicile = 'Jakarta';
  const phoneNumber = '08123456789';

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>User Profile</Heading>
        </Stack>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Center>
            <Avatar size="xl" src="https://bit.ly/sage-adebayo">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Stack spacing={2}>
            <Text fontWeight="bold">Email:</Text>
            <Text>{email}</Text>
            <Text fontWeight="bold">Gender:</Text>
            <Text>{gender}</Text>
            <Text fontWeight="bold">Birth Date:</Text>
            <Text>{birthdate}</Text>
            <Text fontWeight="bold">Domicile:</Text>
            <Text>{domicile}</Text>
            <Text fontWeight="bold">Phone Number:</Text>
            <Text>{phoneNumber}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}
