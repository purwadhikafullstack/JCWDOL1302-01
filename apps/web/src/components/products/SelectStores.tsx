import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import Quantity from './Quantity';

type Props = {
  formData: any;
  stock: any;
  setFormData: any;
  product: any;
  stores: any;
  isAllow: any;
  handleChangeStore: any;
  cart: any;
};

const SelectStores = ({
  formData,
  stock,
  setFormData,
  product,
  stores,
  isAllow,
  handleChangeStore,
  cart,
}: Props) => {
  const dividerColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Stack
      spacing={{ base: 4, sm: 6 }}
      direction={'column'}
      divider={<StackDivider borderColor={dividerColor} />}
    >
      <Text fontSize={'xl'} fontWeight={'300'}>
        {product.description}
      </Text>
      {isAllow && (
        <Stack spacing={6}>
          <FormControl id="province">
            <FormLabel>Store</FormLabel>
            <Select
              value={cart.storeId}
              onChange={handleChangeStore}
              placeholder="Select Store"
            >
              {stores?.map((store: any) => (
                <option
                  key={store.id}
                  value={store.id}
                >{store.name + `${store.distance ? ' - ' + parseFloat(store.distance).toFixed(2) + ' km' : ''}`}</option>
              ))}
            </Select>
          </FormControl>
          <Quantity
            formData={formData}
            stock={stock}
            setFormData={setFormData}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default SelectStores;
