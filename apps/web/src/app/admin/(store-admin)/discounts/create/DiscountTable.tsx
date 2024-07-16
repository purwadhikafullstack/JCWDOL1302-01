import { DISCOUNT_TYPE, DISCOUNT_UNIT } from '@/constants/discount.constant';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import DiscountTableButton from './DiscountTableButtons';

type Props = {
  formData: any;
  store: any;
  handleChange: any;
  products: any;
};

const DiscountTable = ({ formData, store, handleChange, products }: Props) => {
  return (
    <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
      <FormControl id="store">
        <FormLabel>Store</FormLabel>
        <Text as={'b'}>{store?.name}</Text>
      </FormControl>
      <FormControl id="type" isRequired>
        <FormLabel>Discount Type</FormLabel>
        <Select
          name="type"
          width="auto"
          value={formData.type}
          onChange={handleChange}
        >
          <option value={DISCOUNT_TYPE.productDiscount}>
            {DISCOUNT_TYPE.productDiscount}
          </option>
          <option value={DISCOUNT_TYPE.minimumPurchase}>
            {DISCOUNT_TYPE.minimumPurchase}
          </option>
          <option value={DISCOUNT_TYPE.buy1Get1}>
            {DISCOUNT_TYPE.buy1Get1}
          </option>
          <option value={DISCOUNT_TYPE.freeShipping}>
            {DISCOUNT_TYPE.freeShipping}
          </option>
          <option value={DISCOUNT_TYPE.referralCode}>
            {DISCOUNT_TYPE.referralCode}
          </option>
        </Select>
      </FormControl>

      {(formData.type === DISCOUNT_TYPE.productDiscount ||
        formData.type === DISCOUNT_TYPE.buy1Get1) && (
        <>
          <FormControl id="productId" isRequired>
            <FormLabel>Product</FormLabel>
            <Select
              name="productId"
              width="auto"
              value={formData.productId}
              onChange={handleChange}
            >
              <option value=""></option>
              {products?.map((product: any) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {(formData.type === DISCOUNT_TYPE.productDiscount ||
        formData.type === DISCOUNT_TYPE.minimumPurchase) && (
        <>
          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              placeholder="Amount"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="unit" isRequired>
            <FormLabel>Unit</FormLabel>
            <Select
              name="unit"
              width="auto"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value={DISCOUNT_UNIT.amount}>
                {DISCOUNT_UNIT.amount}
              </option>
              <option value={DISCOUNT_UNIT.percentage}>
                {DISCOUNT_UNIT.percentage}
              </option>
            </Select>
          </FormControl>
        </>
      )}

      {formData.type === DISCOUNT_TYPE.referralCode && (
        <>
          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              placeholder="Amount"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="unit" isRequired>
            <FormLabel>Unit</FormLabel>
            <Select
              name="unit"
              width="auto"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value={DISCOUNT_UNIT.amount}>
                {DISCOUNT_UNIT.amount}
              </option>
            </Select>
          </FormControl>
        </>
      )}

      {formData.type === DISCOUNT_TYPE.minimumPurchase && (
        <>
          <FormControl id="minimumPrice" isRequired>
            <FormLabel>Minimum Total Price</FormLabel>
            <Input
              name="minimumPrice"
              placeholder="Minimum Total Price"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={formData.minimumPrice}
              onChange={handleChange}
            />
          </FormControl>
          {formData.unit === 'Percentage' && (
            <FormControl id="maximumDiscount" isRequired>
              <FormLabel>Maximum Discount</FormLabel>
              <Input
                name="maximumDiscount"
                placeholder="Maximum Discount"
                _placeholder={{ color: 'gray.500' }}
                type="number"
                value={formData.maximumDiscount}
                onChange={handleChange}
              />
            </FormControl>
          )}
        </>
      )}

      {formData.type === DISCOUNT_TYPE.freeShipping && (
        <>
          <FormControl id="minimumOrders" isRequired>
            <FormLabel>Minimum Order</FormLabel>
            <Input
              name="minimumOrders"
              placeholder="Minimum Order"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={formData.minimumOrders}
              onChange={handleChange}
            />
          </FormControl>
        </>
      )}

      <DiscountTableButton />
    </Stack>
  );
};

export default DiscountTable;
