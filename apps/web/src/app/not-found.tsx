'use client';

import React from 'react';
import { Box, Heading, Text, Flex, Button, Link } from '@chakra-ui/react';

interface TorchProps {
  x: number;
  y: number;
}

const Torch: React.FC<TorchProps> = ({ x, y }) => {
  return (
    <Box
      pos="fixed"
      top={y}
      left={x}
      zIndex={9999}
      w="200px"
      h="200px"
      borderRadius="full"
      bg="blackAlpha.100"
      boxShadow="0 0 0 9999px #000000f7"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        borderRadius="full"
        boxShadow="inset 0 0 40px 2px #000, 0 0 20px 4px rgba(13, 13, 10, 0.2)"
      />
    </Box>
  );
};

export default function NotFoundPage() {
  const [torchX, setTorchX] = React.useState(0);
  const [torchY, setTorchY] = React.useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setTorchX(event.clientX);
    setTorchY(event.clientY);
  };

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
      onMouseMove={handleMouseMove}
    >
      <Box bg="blackAlpha.600" p={12} rounded="lg" textAlign="center">
        <Heading as="h1" fontSize="15em" color="white" mb={8}>
          404
        </Heading>
        <Heading as="h2" fontSize="5em" color="white" mb={6}>
          Uh, Ohh
        </Heading>
        <Text fontSize="2em" color="white">
          Sorry we cant find what you are looking for cuz its so dark in here
        </Text>
      </Box>
      <Torch x={torchX} y={torchY} />
      <Button>
        <Link href="/not-found" width={10}>
          LAMP
        </Link>
      </Button>
    </Flex>
  );
}
