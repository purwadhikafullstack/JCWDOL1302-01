import { Cart, CartItem } from '@prisma/client';

import { ICart, ICartItem } from '@/interfaces/cart.interface';
import {
  createCartItemQuery,
  deleteCartItemQuery,
  getCartByUserIDQuery,
  getCartItemByProductIDQuery,
  resetCartItemsQuery,
  updateCartItemQuery,
  updateCartQuery,
} from '@/queries/cart.query';
import { HttpException } from '@/exceptions/HttpException';

const getCartByUserIDAction = async (id: string): Promise<Cart | null> => {
  try {
    const cart = await getCartByUserIDQuery(id);

    if (!cart) throw new HttpException(404, 'Data not found');

    return cart;
  } catch (err) {
    throw err;
  }
};

const updateCartAction = async (id: string, data: ICart): Promise<Cart> => {
  try {
    const cart = await updateCartQuery(id, data);
    return cart;
  } catch (err) {
    throw err;
  }
};

const createCartItemAction = async (
  data: ICartItem,
): Promise<CartItem | null> => {
  try {
    const existCartItem = await getCartItemByProductIDQuery(
      data.cartId,
      data.productId,
    );

    let cartItem;

    if (existCartItem) {
      cartItem = await updateCartItemQuery(existCartItem.id, data);
    } else {
      cartItem = await createCartItemQuery(data);
    }

    return cartItem;
  } catch (err) {
    throw err;
  }
};

const deleteCartItemAction = async (id: string): Promise<CartItem> => {
  try {
    const cartItem = await deleteCartItemQuery(id);
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const resetCartItemsAction = async (cartId: string) => {
  try {
    await resetCartItemsQuery(cartId);
  } catch (err) {
    throw err;
  }
};

export {
  updateCartAction,
  deleteCartItemAction,
  createCartItemAction,
  getCartByUserIDAction,
  resetCartItemsAction,
};
