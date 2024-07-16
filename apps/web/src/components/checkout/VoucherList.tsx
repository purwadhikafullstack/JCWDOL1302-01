"use client";

import { DISCOUNT_TYPE, DISCOUNT_UNIT } from "@/constants/discount.constant";
import { updateCartDiscountState } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getVouchersByUserID } from "@/services/voucher.service";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { Badge, Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'

const VoucherList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [discountVouchers, setDiscountVouchers] = useState<any[]>([]);
  const [shippingVouchers, setShippingVouchers] = useState<any[]>([]);
  const [referralVouchers, setReferralVouchers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const data = await getVouchersByUserID(user.id);

      setDiscountVouchers(data?.filter((voucher: any) => {
        return voucher?.discount?.type === DISCOUNT_TYPE.minimumPurchase;
      }));

      setShippingVouchers(data?.filter((voucher: any) => {
        return voucher?.discount?.type === DISCOUNT_TYPE.freeShipping;
      }));
      
      setReferralVouchers(data?.filter((voucher: any) => {
        return voucher?.discount?.type === DISCOUNT_TYPE.referralCode;
      }));
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

      {discountVouchers.length > 0 && (
        <Stack spacing="4" direction="column">
          <Heading as="h3" fontSize="md" color="#4A5568">Voucher Diskon</Heading>
          <RadioGroup>
            <Stack spacing="2" direction="column">
              {discountVouchers?.map((voucher: any) => (
                <Radio colorScheme='green' key={voucher.id} onChange={() => handleChange(voucher.discount)}>
                  <Badge variant='outline' fontSize='0.8em' colorScheme='green' px={4} py={2} ml={2} borderRadius={5}>
                    <Text>
                      Diskon {voucher?.discount?.unit === DISCOUNT_UNIT.percentage ? `${voucher?.discount?.amount}%` : FormatCurrency(voucher?.discount?.amount)}
                    </Text>
                  </Badge>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      )}

      {shippingVouchers.length > 0 && (
        <Stack spacing="4" direction="column">
          <Heading as="h3" fontSize="md" color="#4A5568">Voucher Gratis Ongkir</Heading>
          <RadioGroup>
            <Stack spacing="2" direction="column">
              {shippingVouchers?.map((voucher: any) => (
                <Radio colorScheme='green' key={voucher.id} onChange={() => handleChange(voucher.discount)}>
                  <Badge variant='outline' fontSize='0.8em' colorScheme='green' px={4} py={2} ml={2} borderRadius={5}>
                    <Text>Gratis Ongkir</Text>
                  </Badge>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      )}

      {referralVouchers.length > 0 && (
        <Stack spacing="4" direction="column">
          <Heading as="h3" fontSize="md" color="#4A5568">Voucher Referral</Heading>
            <RadioGroup>
              <Stack spacing="2" direction="column">
                {referralVouchers?.map((voucher: any) => (
                  <Radio colorScheme='green' key={voucher.id} onChange={() => handleChange(voucher.discount)}>
                    <Badge variant='outline' fontSize='0.8em' colorScheme='green' px={4} py={2} ml={2} borderRadius={5}>
                      <Text>Diskon Referral {FormatCurrency(voucher?.discount?.amount)}</Text>
                    </Badge>
                  </Radio>
                ))}
              </Stack>
          </RadioGroup>
        </Stack>
      )}
    </Stack>
  )
}

export default VoucherList