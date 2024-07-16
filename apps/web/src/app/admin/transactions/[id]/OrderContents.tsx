import { ORDER_STATUS } from '@/constants/order.constant';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { formatDate } from '@/utils/date';
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const OrderContent = ({
  id,
  label,
  value,
}: {
  id?: string;
  label?: string;
  value?: string | ReactNode;
}) => (
  <FormControl id={id}>
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 3 }}
      spacing={{ base: 0, sm: 0, md: 10 }}
      alignItems="center"
    >
      <FormLabel>{label}</FormLabel>
      <Text gridColumn={{ base: 'unset', sm: 'unset', md: '2/-1' }}>
        {value}
      </Text>
    </SimpleGrid>
  </FormControl>
);

const OrderStatus = ({
  text,
  status,
}: {
  text: string;
  status: 'error' | 'info' | 'warning' | 'success';
}) => (
  <Alert status={status} width="auto" display="inline-flex" borderRadius={10}>
    <AlertIcon />
    {text}
  </Alert>
);

type Props = {
  order: any;
};

const OrderContents = ({ order }: Props) => {
  return (
    <>
      <OrderContent id="name" label="Name" value={order?.user.name || '-'} />
      <OrderContent id="email" label="Email" value={order?.user.email} />
      <OrderContent id="phone" label="Phone" value={order?.user.phone || '-'} />
      <OrderContent
        id="address"
        label="Address"
        value={`${order?.userAddress.address}, ${order?.userAddress.subdistrictName}, ${order?.userAddress.cityName}, ${order?.userAddress.provinceName} ${order?.userAddress.postalCode || ''}`}
      />
      <OrderContent id="store" label="Store" value={order?.store.name || '-'} />
      <OrderContent
        id="itemsPrice"
        label="Product Subtotal"
        value={FormatCurrency(order?.itemsPrice)}
      />
      <OrderContent
        id="shippingPrice"
        label="Shipping Subtotal"
        value={FormatCurrency(order?.shippingPrice)}
      />
      {order?.itemsDiscount && (
        <OrderContent
          id="itemsDiscount"
          label="Product Discount"
          value={FormatCurrency(-order?.itemsDiscount)}
        />
      )}
      {order?.shippingDiscount && (
        <OrderContent
          id="shippingDiscount"
          label="Shipping Discount"
          value={FormatCurrency(-order?.shippingDiscount)}
        />
      )}
      {order?.voucherDiscount && (
        <OrderContent
          id="voucherDiscount"
          label="Voucher Discount"
          value={FormatCurrency(-order?.voucherDiscount)}
        />
      )}
      {order?.referralDiscount && (
        <OrderContent
          id="referralDiscount"
          label="Referral Discount"
          value={FormatCurrency(-order?.referralDiscount)}
        />
      )}
      <OrderContent
        id="totalPrice"
        label="Total Price"
        value={FormatCurrency(order?.totalPrice)}
      />
      <OrderContent
        id="orderDate"
        label="Order Date"
        value={formatDate(order?.orderDate)}
      />
      <OrderContent
        id="paymentMethod"
        label="Payment Method"
        value={order?.paymentMethod}
      />
      <OrderContent
        id="paymentDate"
        label="Payment Date"
        value={formatDate(order?.paymentDate) || '-'}
      />
      <OrderContent
        id="shippingMethod"
        label="Shipping Method"
        value={`${order?.shippingCourier} - ${order?.shippingService}`}
      />
      <OrderContent
        id="shippingDate"
        label="Shipping Date"
        value={formatDate(order?.shippingDate) || '-'}
      />
      <OrderContent
        id="orderStatus"
        label="Order Status"
        value={
          [
            ORDER_STATUS.menungguPembayaran,
            ORDER_STATUS.menungguKonfirmasiPembayaran,
          ].includes(order?.orderStatus) ? (
            <OrderStatus status="warning" text={order?.orderStatus} />
          ) : [ORDER_STATUS.diproses, ORDER_STATUS.dikirim].includes(
              order?.orderStatus,
            ) ? (
            <OrderStatus status="info" text={order?.orderStatus} />
          ) : [ORDER_STATUS.dibatalkan].includes(order?.orderStatus) ? (
            <OrderStatus status="error" text={order?.orderStatus} />
          ) : (
            <OrderStatus status="success" text={order?.orderStatus} />
          )
        }
      />
    </>
  );
};

export default OrderContents;
