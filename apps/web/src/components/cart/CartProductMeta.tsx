'use client';

import {
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export type CartProductMetaProps = {
  name: string;
  slug: string;
  image: string;
};

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { name, slug, image } = props;

  return (
    <Stack direction="column" spacing="5" width="50%" alignItems="center">
      <Link href={`/products/${slug}`}>
        <Image
          rounded="lg"
          width={'80px'}
          height={'80px'}
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
      </Link>
      <Text fontWeight="medium" textAlign={'center'}>
        {name}
      </Text>
    </Stack>
  );
};
