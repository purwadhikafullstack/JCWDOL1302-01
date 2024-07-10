import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Cart {
  itemsCount: number,
  storeId: string,
  userAddressId: string,
  origin: string,
  destination: string,
  itemsPrice: number,
  itemsDiscount: number,
  shippingDiscount: number,
  voucherDiscount: number,
  referralDiscount: number,
  totalPrice: number,
  shippingCourier: string,
  shippingService: string,
  shippingPrice: number,
  paymentMethod: string,
}

const cartState = {
  itemsCount: 0,
  storeId: '',
  userAddressId: '',
  origin: '',
  destination: '',
  itemsPrice: 0,
  itemsDiscount: 0,
  shippingDiscount: 0,
  voucherDiscount: 0,
  referralDiscount: 0,
  totalPrice: 0,
  shippingCourier: '',
  shippingService: '',
  shippingPrice: 0,
  paymentMethod: '',
} as Cart;

const initialState = (
  typeof window !== "undefined" && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || JSON.stringify(cartState))
    : cartState
) as Cart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItemsState: (state: Cart, action: PayloadAction<{ itemsCount?: number, itemsPrice?: number, itemsDiscount?: number }>) => {
      if (action.payload.itemsCount) {
        state.itemsCount = action.payload.itemsCount;
      }
      if (action.payload.itemsPrice) {
        state.itemsPrice = action.payload.itemsPrice;
      }
      if (action.payload.itemsDiscount) {
        state.itemsDiscount = action.payload.itemsDiscount;
      }
      return updateCart(state);
    },
    updateCartStoreState: (state: Cart, action: PayloadAction<{ storeId: string }>) => {
      state.storeId = action.payload.storeId;
      return updateCart(state);
    },
    updateCartOriginState: (state: Cart, action: PayloadAction<{ origin: string }>) => {
      state.origin = action.payload.origin;
      return updateCart(state);
    },
    updateCartDestinationState: (state: Cart, action: PayloadAction<{ destination: string, userAddressId: string }>) => {
      state.destination = action.payload.destination;
      state.userAddressId = action.payload.userAddressId;
      return updateCart(state);
    },
    updateCartShippingState: (state: Cart, action: PayloadAction<{ shippingCourier: string, shippingService: string, shippingPrice: number }>) => {
      state.shippingCourier = action.payload.shippingCourier;
      state.shippingService = action.payload.shippingService;
      state.shippingPrice = action.payload.shippingPrice;
      return updateCart(state);
    },
    updateCartPaymentState: (state: Cart, action: PayloadAction<{ paymentMethod: string }>) => {
      state.paymentMethod = action.payload.paymentMethod;
      return updateCart(state);
    },
    updateCartDiscountState: (state: Cart, action: PayloadAction<{ voucherDiscount?: number, shippingDiscount?: number, referralDiscount?: number }>) => {
      if (action.payload.voucherDiscount) {
        state.voucherDiscount = action.payload.voucherDiscount;
      }
      if (action.payload.shippingDiscount) {
        state.shippingDiscount = action.payload.shippingDiscount;
      }
      if (action.payload.referralDiscount) {
        state.referralDiscount = action.payload.referralDiscount;
      }
      return updateCart(state);
    },
    resetCartState: (state: Cart) => {
      localStorage.removeItem("cart");
      return cartState;
    },
  },
});

const updateCart = (state: Cart) => {
  state.totalPrice = Number(state.itemsPrice)
    + Number(state.shippingPrice)
    - Number(state.itemsDiscount)
    - Number(state.shippingDiscount)
    - Number(state.voucherDiscount)
    - Number(state.referralDiscount);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
}

export const {
  updateCartItemsState,
  updateCartStoreState,
  updateCartOriginState,
  updateCartDestinationState,
  updateCartShippingState,
  updateCartPaymentState,
  updateCartDiscountState,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;