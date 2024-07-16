import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

type FormData = {
  formData: any;
};

const AddToCartButton = (formData: FormData) => {
  return (
    <Button
      rounded={'full'}
      w={'full'}
      mt={8}
      size={'lg'}
      py={'7'}
      bg={'green.600'}
      color={'white'}
      textTransform={'uppercase'}
      _hover={{ transform: 'translateY(2px)', boxShadow: 'lg' }}
      type="submit"
      isDisabled={!formData.formData.quantity}
    >
      <FaCartPlus />
      <Text as={'span'} ml={5}>
        Add to Cart
      </Text>
    </Button>
  );
};

export default AddToCartButton;
