'use client';

import { updateCartItemsState } from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  createCartItem,
  getCartByID,
  getCartByUserID,
} from '@/services/cart.service';
import { getStockByProductIdAndStoreId } from '@/services/stock.service';
import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

type Props = {
  item: any;
};

const CartItemQuantity = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [stock, setStock] = useState<any>(null);

  const [formData, setFormData] = useState({
    cartId: item.cartId,
    productId: item.productId,
    quantity: item.quantity,
  });

  useEffect(() => {
    (async () => {
      if (!item.productId || !cart.storeId) return;

      const dataStock = await getStockByProductIdAndStoreId(
        item.productId,
        cart.storeId,
      );
      setStock(dataStock);
    })();
  }, [item.productId, cart.storeId]);

  const validateQuantity = () => {
    if (formData.quantity < 1) {
      changeQuantity(1);
    } else if (formData.quantity > stock?.remainingStock) {
      changeQuantity(stock?.remainingStock);
    }
  };

  const decrementQuantity = () => {
    if (formData.quantity > 1) {
      changeQuantity(formData.quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (formData.quantity < stock?.remainingStock) {
      changeQuantity(formData.quantity + 1);
    }
  };

  const changeQuantity = async (quantity: number) => {
    try {
      const newFormData = { ...formData };
      newFormData.quantity = quantity;

      const cartItem = await createCartItem(newFormData);
      if (!cartItem) throw new Error('Update cart item failed!');

      if (user.id) {
        const dataCart = await getCartByUserID(user.id);
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.length,
            itemsPrice: dataCart.itemsPrice,
            itemsDiscount: dataCart.itemsDiscount,
          }),
        );
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity,
      }));
    } catch (err) {
      console.error(err);
      toast.error('Update cart item failed');
    }
  };

  return (
    <Flex direction="column" textAlign="center" gap={2}>
      <Box display="inline-flex" justifyContent="center" alignItems="center">
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
          width={{ base: '22%', sm: '20%' }}
          type="number"
          borderRadius={0}
          value={formData.quantity}
          onChange={(e) => changeQuantity(Number(e.target.value))}
          onBlur={validateQuantity}
          isDisabled={!stock?.remainingStock}
          textAlign={'center'}
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

      <Box>
        <FormLabel display={'inline'}>Stock:</FormLabel>
        <Text as={'span'}>{stock?.remainingStock}</Text>
      </Box>
    </Flex>
  );
};

export default CartItemQuantity;
