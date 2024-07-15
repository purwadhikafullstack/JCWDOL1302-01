'use client';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Image,
  Flex,
  Link,
  chakra,
} from '@chakra-ui/react';

export default function Error() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
              Wow!!! Page Error !!!
            </chakra.strong>{' '}
            <Flex alignContent="center" justifyContent="center">
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  'https://media.istockphoto.com/id/509981891/vector/monkey-with-a-banana.jpg?s=612x612&w=0&k=20&c=WE-R9YhMggcE0FfppCVmfrqje_APsJR5J_TIbEYSd3M='
                }
                width={250}
                mt={10}
              />
            </Flex>
          </Heading>
          <Box>
            <Text color={'gray.500'}>Something Wrong Here!!</Text>
            <Text color={'gray.500'}>
              This monkey will accompany you so that you dont get confused
              alone
            </Text>
          </Box>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Link href="/">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Back to Home
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
