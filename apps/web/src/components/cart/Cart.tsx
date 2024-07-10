'use client';

import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CartItem } from './CartItems';
import { CartSummary } from './CartSummary';
import { deleteCartItem, getCartByUserID } from '@/services/cart.service';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { updateCartItemsState } from '@/lib/features/cart/cartSlice';
import { toast } from 'react-toastify';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [cart, setCart] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const data = await getCartByUserID(user.id);
      setCart(data);
    })();
  }, [user]);

  const handleRemoveCartItem = async (id: string) => {
    if (!confirm(`Are you sure want to remove cart item?`) || !id) return;

    try {
      const cartItem = await deleteCartItem(id);
      if (!cartItem) throw new Error('Remove from cart failed!');

      if (user.id) {
        const dataCart = await getCartByUserID(user.id);
        setCart(dataCart);
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.length,
            itemsPrice: dataCart.itemsPrice,
            itemsDiscount: dataCart.itemsDiscount,
          }),
        );
      }

      toast.success('Remove cart item success');
    } catch (err) {
      console.error(err);
      toast.error('Remove cart item failed');
    }
  };

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      mb={10}
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="3xl" fontWeight="extrabold" textAlign={'center'}>
            Shopping Cart
          </Heading>
          <Divider />

          {cart?.cartItems?.length > 0 ? (
            <Stack spacing="6">
              {cart?.cartItems?.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleRemoveCartItem={handleRemoveCartItem}
                />
              ))}
            </Stack>
          ) : (
            <CartEmpty />
          )}
        </Stack>

        <Flex
          direction="column"
          align="center"
          flex="1"
          mt={{ base: 0, sm: 100 }}
        >
          {cart?.cartItems?.length > 0 && (
            <>
              <CartSummary />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link
                  style={{ color: 'rgb(49, 130, 206)' }}
                  href="/products?category"
                >
                  Continue shopping
                </Link>
              </HStack>
            </>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

export default Cart;
