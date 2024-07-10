export interface ICart {
  userId: string;
  storeId?: string;
  itemsPrice: number;
}

export interface IUpdateCart {
  storeId?: string;
  itemsPrice?: number;
  itemsDiscount?: number;
  totalPrice?: number;
}

export interface ICartItem {
  cartId: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  quantity: number;
  price: number;
}
