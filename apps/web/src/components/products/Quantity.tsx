import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

type Props = {
  formData: any;
  stock: any;
  setFormData: any;
};

const Quantity = ({ formData, stock, setFormData }: Props) => {
  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateQuantity = () => {
    if (formData.quantity < 1) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        quantity: 1,
      }));
    } else if (formData.quantity > stock.remainingStock) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        quantity: stock.remainingStock,
      }));
    }
  };

  const decrementQuantity = () => {
    if (formData.quantity > 1) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        quantity: prevFormData.quantity - 1,
      }));
    }
  };

  const incrementQuantity = () => {
    if (formData.quantity < stock.remainingStock) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        quantity: prevFormData.quantity + 1,
      }));
    }
  };
  return (
    <FormControl id="quantity">
      <FormLabel>Quantity</FormLabel>
      <Box display="inline-flex" mr={5}>
        <IconButton
          aria-label="left"
          icon={<Icon as={FiMinus} />}
          borderRightRadius={0}
          onClick={decrementQuantity}
          isDisabled={!stock?.remainingStock || !formData.quantity}
        />
        <Input
          name="quantity"
          placeholder="Quantity"
          width={'50%'}
          type="number"
          borderRadius={0}
          value={formData.quantity}
          onChange={handleChange}
          onBlur={validateQuantity}
          isDisabled={!stock?.remainingStock}
        />
        <IconButton
          aria-label="right"
          icon={<Icon as={FiPlus} />}
          borderLeftRadius={0}
          onClick={incrementQuantity}
          isDisabled={
            !stock?.remainingStock ||
            formData.quantity === stock?.remainingStock
          }
        />
      </Box>
      {stock?.remainingStock > 0 ? (
        <>
          <FormLabel display={'inline'}>Stock:</FormLabel>
          <Text as={'span'}>{stock.remainingStock}</Text>
        </>
      ) : (
        <FormLabel display={'inline'} color={'red.500'}>
          Out of Stock
        </FormLabel>
      )}
    </FormControl>
  );
};

export default Quantity;
