'use client';

import { CloseButton, Flex } from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import CartItemQuantity from './CartItemQuantity';

type Props = {
  item: any;
  handleRemoveCartItem: (id: string) => void;
};

export const CartItem = ({ item, handleRemoveCartItem }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      borderWidth="1px"
      rounded="lg"
      padding="4"
      width="full"
    >
      <CartProductMeta
        name={item.name}
        slug={item.slug}
        image={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/products/${item.image}`}
      />

      {/* Desktop */}
      <Flex
        flexGrow={1}
        width="full"
        justify="space-between"
        alignItems="center"
        display={{ base: 'none', md: 'flex' }}
      >
        <CartItemQuantity item={item} />
        <PriceTag
          price={item.price}
          discount={item.discount}
          isBuy1Get1={item.isBuy1Get1}
        />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            handleRemoveCartItem(item.id);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
        direction={'column-reverse'}
        gap={2}
      >
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            handleRemoveCartItem(item.id);
          }}
        />
        <CartItemQuantity item={item} />
        <PriceTag
          price={item.price}
          discount={item.discount}
          isBuy1Get1={item.isBuy1Get1}
        />
      </Flex>
    </Flex>
  );
};
