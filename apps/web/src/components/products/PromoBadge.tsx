import { Badge, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  DISCOUNT_TYPE,
  DISCOUNT_UNIT,
  FormatCurrency,
  getDiscountByProductIdAndStoreId,
  getStockByProductIdAndStoreId,
} from './imports/import';

type Props = {
  formData: any;
  product: any;
  discount: any;
  prevFormData: any;
  setFormData: any;
  cart: any;
  stock: any;
  setStock: any;
  setDiscount: any;
};

const PromoBadge = ({
  formData,
  product,
  discount,
  setFormData,
  cart,
  setStock,
  setDiscount,
}: Props) => {
  const textColor = useColorModeValue('gray.900', 'gray.400');

  useEffect(() => {
    (async () => {
      if (!product.id || !cart.storeId) return;

      const dataStock = await getStockByProductIdAndStoreId(
        product.id,
        cart.storeId,
      );
      setStock(dataStock);

      const dataDiscount = await getDiscountByProductIdAndStoreId(
        product.id,
        cart.storeId,
      );
      setDiscount(dataDiscount);

      if (dataDiscount) {
        if (dataDiscount?.type === DISCOUNT_TYPE.productDiscount) {
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            discount:
              dataDiscount.unit === DISCOUNT_UNIT.percentage
                ? Math.round((prevFormData.price * dataDiscount.amount) / 100)
                : dataDiscount.amount,
          }));
        } else if (dataDiscount?.type === DISCOUNT_TYPE.buy1Get1) {
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            isBuy1Get1: true,
          }));
        }
      }
    })();
  }, [product.id, cart.storeId]);

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={5}
      alignItems={{ base: 'start', sm: 'center' }}
    >
      {formData.discount > 0 ? (
        <>
          <Flex alignItems="center" gap={5}>
            <Text color={textColor} fontWeight={500} fontSize={'2xl'}>
              {FormatCurrency(product.price - formData.discount)}
            </Text>
            <Text
              color={'red'}
              fontWeight={400}
              fontSize={'xl'}
              textDecoration={'line-through'}
            >
              {FormatCurrency(product.price)}
            </Text>
          </Flex>
          <Badge variant="solid" colorScheme="green">
            {discount.type === DISCOUNT_TYPE.productDiscount &&
            discount.unit === DISCOUNT_UNIT.amount
              ? discount.type + ' ' + FormatCurrency(discount.amount)
              : discount.type + ' ' + discount.amount + '%'}
          </Badge>
        </>
      ) : (
        <Text color={textColor} fontWeight={500} fontSize={'2xl'}>
          {FormatCurrency(product.price)}
        </Text>
      )}
      {discount && discount?.type === DISCOUNT_TYPE.buy1Get1 && (
        <Badge variant="solid" colorScheme="green">
          Buy 1 Get 1
        </Badge>
      )}
    </Flex>
  );
};

export default PromoBadge;
