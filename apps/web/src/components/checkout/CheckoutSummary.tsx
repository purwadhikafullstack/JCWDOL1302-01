'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getCartByUserID } from "@/services/cart.service";
import { toast } from "react-toastify";
import { createOrder } from "@/services/order.service";
import { resetCartState, updateCartStoreState } from "@/lib/features/cart/cartSlice";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;

  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CheckoutSummary = () => {
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDisabled = !cart.userAddressId || !cart.shippingCourier || !cart.shippingService || !cart.paymentMethod;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleOrder = async () => {
    try {
      const dataCart = await getCartByUserID(user.id as string);
      const cartItems = dataCart.cartItems;

      const vouchers: string[] = [];
      if (cart.discountVoucherId) vouchers.push(cart.discountVoucherId);
      if (cart.shippingVoucherId) vouchers.push(cart.shippingVoucherId);
      if (cart.referralVoucherId) vouchers.push(cart.referralVoucherId);

      const formData = {
        orderNumber: "MIND-" + crypto.randomUUID().split("-")[0],
        userId: user.id,
        userAddressId: cart.userAddressId,
        storeId: cart.storeId,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        itemsDiscount: cart.itemsDiscount,
        shippingDiscount: cart.shippingDiscount,
        voucherDiscount: cart.voucherDiscount,
        referralDiscount: cart.referralDiscount,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
        shippingCourier: cart.shippingCourier,
        shippingService: cart.shippingService,
        vouchers,
        orderItems: cartItems.map((item: any) => {
          return {
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: item.image,
            quantity: item.quantity,
            bonusQuantity: Boolean(item.isBuy1Get1) ? item.quantity : 0,
            price: item.price,
            discount: item.discount,
          }
        }),
      }

      const order = await createOrder(formData);
      if (!order) throw new Error("Create order failed");

      dispatch(resetCartState());
      dispatch(updateCartStoreState({
        storeId: dataCart.storeId
      }));

      router.push(`/users/orders/${order.id}`);
      toast.success("Create order success");
    } catch (err) {
      toast.error("Create order failed");
    }
  }

  if (!isLoaded) return <></>;

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="4">
        <OrderSummaryItem label="Product Subtotal" value={FormatCurrency(cart.itemsPrice!)} />
        <OrderSummaryItem label="Shipping Subtotal" value={FormatCurrency(cart.shippingPrice!)} />
        {cart.itemsDiscount && (
          <OrderSummaryItem label="Product Discount" value={FormatCurrency(-cart.itemsDiscount!)} />
        )}
        {cart.shippingDiscount && (
          <OrderSummaryItem label="Shipping Discount" value={FormatCurrency(-cart.shippingDiscount!)} />
        )}
        {cart.voucherDiscount && (
          <OrderSummaryItem label="Voucher Discount" value={FormatCurrency(-cart.voucherDiscount!)} />
        )}
        {cart.referralDiscount && (
          <OrderSummaryItem label="Referral Discount" value={FormatCurrency(-cart.referralDiscount!)} />
        )}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {FormatCurrency(cart.totalPrice!)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={handleOrder}
        isDisabled={isDisabled}
      >
        Order
      </Button>
      {isDisabled && (
        <Alert status='info' borderRadius={5}>
          <AlertIcon />
          Please select shipping method & payment method first!
        </Alert>
      )}
    </Stack>
  );
};
