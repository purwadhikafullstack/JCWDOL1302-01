'use client';

import React from 'react';
import { Box, Heading, Text, Flex, Button, Link } from '@chakra-ui/react';

interface TorchProps {
  x: number;
  y: number;
}

export default function NotFoundPage() {
  return (
    <Flex
      className="not-found-page"
      minH="100vh"
      bgImage="https://i.pinimg.com/564x/db/e2/fa/dbe2fa41cb1b2b92371a0d46dc056204.jpg"
      bgSize="cover"
      bgPosition="center"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="blackAlpha.600" p={12} rounded="lg" textAlign="center">
        <Heading as="h1" fontSize="15em" color="white" mb={8}>
          404
        </Heading>
        <Heading as="h2" fontSize="5em" color="white" mb={6}>
          Uh, Ohh
        </Heading>
        <Text fontSize="2em" color="white">
          Sorry we can not find what you are looking for cuz its so dark in here
        </Text>
      </Box>
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </Flex>
  );
}
