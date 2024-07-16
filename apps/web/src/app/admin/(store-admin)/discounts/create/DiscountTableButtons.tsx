import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';

const DiscountTableButton = () => {
  const router = useRouter();

  return (
    <Stack spacing={6} direction={['column', 'row']}>
      <Button
        onClick={() => {
          router.push(`/admin/discounts`);
        }}
        bg={'red.400'}
        color={'white'}
        w="full"
        _hover={{
          bg: 'red.500',
        }}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        bg={'blue.400'}
        color={'white'}
        w="full"
        _hover={{
          bg: 'blue.500',
        }}
      >
        Create
      </Button>
    </Stack>
  );
};

export default DiscountTableButton;
