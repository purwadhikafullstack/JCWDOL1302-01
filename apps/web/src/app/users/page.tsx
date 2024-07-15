import { Flex, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text
          fontSize="5xl"
          fontFamily="monospace"
          fontWeight="bold"
          textAlign={{ base: 'center', md: 'left' }}
          backgroundColor={'white'}
          borderRadius={'3xl'}
        >
          Welcome to User Dashboard
        </Text>
        <Image
          src="/assets/images/userdashboard.svg"
          alt="welcome"
          w={500}
          h={{ base: 300, sm: 500 }}
        />
      </Flex>
    </div>
  );
};

export default Page;
