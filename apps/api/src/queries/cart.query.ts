import { PrismaClient, Cart, CartItem } from '@prisma/client';
import { ICart, ICartItem, IUpdateCart } from '../interfaces/cart.interface';

const prisma = new PrismaClient();

const getCartByUserIDQuery = async (userId: string): Promise<Cart | null> => {
  try {
    const cart = await prisma.cart.findFirst({
      include: {
        cartItems: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const getCartByIDQuery = async (id: string): Promise<Cart | null> => {
  try {
    const cart = await prisma.cart.findUnique({
      include: {
        cartItems: true,
      },
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const createCartQuery = async (data: ICart): Promise<Cart> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const cart = await prisma.cart.create({
          data: {
            ...data,
          },
        });

        return cart;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateCartQuery = async (id: string, data: IUpdateCart): Promise<Cart> => {
  try {
    const cart = await prisma.cart.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const deleteCartQuery = async (id: string): Promise<Cart> => {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const getCartItemByProductIDQuery = async (
  cartId: string,
  productId: string,
): Promise<CartItem | null> => {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        AND: {
          cart: {
            id: cartId,
          },
          product: {
            id: productId,
          },
        },
      },
    });

    return cartItem;
  } catch (err) {
    throw err;
  }
};

const createCartItemQuery = async (data: ICartItem): Promise<CartItem> => {
  try {
    const cartItem = await prisma.cartItem.create({
      data: {
        ...data,
      },
    });

    await updateCartItemsPriceQuery(data.cartId);
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const updateCartItemQuery = async (
  id: string,
  data: ICartItem,
): Promise<CartItem> => {
  try {
    const cartItem = await prisma.cartItem.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });

    await updateCartItemsPriceQuery(data.cartId);
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const deleteCartItemQuery = async (id: string): Promise<CartItem> => {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    await updateCartItemsPriceQuery(cartItem.cartId);
    return cartItem;
  } catch (err) {
    throw err;
  }
};


const updateCartItemsPriceQuery = async (id: string): Promise<Cart | null> => {
  try {
    const cart = await prisma.cart.findUnique({
      include: {
        cartItems: true,
      },
      where: {
        id,
      },
    });

    const itemsPrice = cart?.cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0) || 0;
    const itemsDiscount = cart?.cartItems.reduce((acc, item) => acc + (item.quantity * item.discount), 0) || 0;
    const totalPrice = itemsPrice - itemsDiscount;

    await updateCartQuery(id, { itemsPrice, itemsDiscount, totalPrice });
    return cart;
  } catch (err) {
    throw err;
  }
};

const resetCartItemsQuery = async (cartId: string) => {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    });

    await updateCartItemsPriceQuery(cartId);

  } catch (err) {
    throw err;
  }
};

export {
  updateCartItemQuery,
  deleteCartItemQuery,
  createCartItemQuery,
  getCartByUserIDQuery,
  getCartByIDQuery,
  createCartQuery,
  updateCartQuery,
  deleteCartQuery,
  getCartItemByProductIDQuery,
  resetCartItemsQuery,
};