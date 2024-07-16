import { FormatCurrency } from '@/utils/FormatCurrency';
import { Badge, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';

interface PriceTagProps {
  price: number;
  discount?: number;
  isBuy1Get1?: boolean;
}

export const PriceTag = ({ price, discount, isBuy1Get1 }: PriceTagProps) => {
  return (
    <Flex direction="column" textAlign="center" gap={0}>
      {discount && discount > 0 ? (
        <Flex direction="column" gap={2}>
          <Text as="span" fontWeight="medium">
            {FormatCurrency(price - discount)}
          </Text>
          <Text
            as="span"
            fontWeight="medium"
            fontSize="0.9em"
            color="red"
            textDecoration="line-through"
          >
            {FormatCurrency(price)}
          </Text>
          <Badge variant="solid" colorScheme="green">
            <Text fontSize={'smaller'}>Discount</Text>
          </Badge>
        </Flex>
      ) : (
        <Text as="span" fontWeight="medium">
          {FormatCurrency(price)}
        </Text>
      )}
      {isBuy1Get1 && (
        <Badge variant="solid" colorScheme="green">
          <Text fontSize={'smaller'}>Buy 1 Get 1</Text>
        </Badge>
      )}
    </Flex>
  );
};
