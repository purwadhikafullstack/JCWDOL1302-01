"use client";

import { DISCOUNT_TYPE, DISCOUNT_UNIT } from "@/constants/discount.constant";
import { updateCartDiscountState } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getVouchersByUserID } from "@/services/voucher.service";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { Badge, Checkbox, Heading, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'

const VoucherList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [vouchers, setVouchers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const data = await getVouchersByUserID(user.id);
      setVouchers(data);
    })()
  }, [user.id]);

  const handleChange = (discount: any) => {
    if (discount.type === DISCOUNT_TYPE.freeShipping) {
      dispatch(updateCartDiscountState({
        shippingDiscount: cart.shippingPrice,
      }));
    } else if (discount.type === DISCOUNT_TYPE.referralCode) {
      dispatch(updateCartDiscountState({
        referralDiscount: Number(discount.amount),
      }));
    } else {
      dispatch(updateCartDiscountState({
        voucherDiscount: discount.unit === DISCOUNT_UNIT.percentage
          ? Math.round(cart.totalPrice * Number(discount.amount) / 100)
          : Number(discount.amount),
      }));
    }
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Select Vouchers</Heading>

      <Stack spacing="4" direction="column">
        {vouchers?.map((voucher: any) => (
          <Checkbox colorScheme='green' key={voucher.id} onChange={() => handleChange(voucher.discount)}>
            <Badge variant='outline' fontSize='0.8em' colorScheme='green' px={4} py={2} ml={2} borderRadius={5}>
              {voucher?.discount?.type === DISCOUNT_TYPE.freeShipping ? (
                <Text>Gratis Ongkir</Text>
              ) : (voucher?.discount?.type == DISCOUNT_TYPE.referralCode) ? (
                <Text>Diskon Referral {FormatCurrency(voucher?.discount?.amount)}</Text>
              ) : (
                <Text>Diskon {voucher?.discount?.unit === DISCOUNT_UNIT.percentage ? `${voucher?.discount?.amount}%` : FormatCurrency(voucher?.discount?.amount)}</Text>
              )}
            </Badge>
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  )
}

export default VoucherList