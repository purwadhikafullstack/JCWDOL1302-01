import { IPaymentMethod } from "@/interface/payment.interface";

export const ewallets: IPaymentMethod[] = [
  // {
  //   value: 'GOPAY',
  //   image: '/assets/images/gopay.png',
  // },
  {
    value: 'OVO',
    image: '/assets/images/ovo.png',
  },
  {
    value: 'DANA',
    image: '/assets/images/dana.png',
  },
  {
    value: 'SHOPEEPAY',
    image: '/assets/images/shopeepay.png',
  },
];

export const virtualAccounts: IPaymentMethod[] = [
  {
    value: 'BCA',
    image: '/assets/images/bca.png',
  },
  {
    value: 'BNI',
    image: '/assets/images/bni.png',
  },
  {
    value: 'BRI',
    image: '/assets/images/bri.png',
  },
  {
    value: 'BSI',
    image: '/assets/images/bsi.png',
  },
  {
    value: 'MANDIRI',
    image: '/assets/images/mandiri.png',
  },
  {
    value: 'PERMATA',
    image: '/assets/images/permata.png',
  },
];

export const transferBanks: IPaymentMethod[] = [
  {
    value: 'BANK',
    image: '/assets/images/atm-bersama.png',
  },
];

export const minimarkets: IPaymentMethod[] = [
  {
    value: 'ALFAMART',
    image: '/assets/images/alfamart.png',
  },
  {
    value: 'INDOMARET',
    image: '/assets/images/indomaret.png',
  },
];