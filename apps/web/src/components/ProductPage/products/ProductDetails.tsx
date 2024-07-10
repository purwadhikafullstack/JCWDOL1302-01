'use client';

import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaCartPlus } from 'react-icons/fa';
import ImageSlider from './ImageSlider';
import { toast } from 'react-toastify';
import {
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
} from '@/services/cart.service';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { getDistanceStores } from '@/services/store.service';
import {
  updateCartItemsState,
  updateCartStoreState,
} from '@/lib/features/cart/cartSlice';
import { getStockByProductIdAndStoreId } from '@/services/stock.service';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { getDiscountByProductIdAndStoreId } from '@/services/discount.service';
import { DISCOUNT_TYPE, DISCOUNT_UNIT } from '@/constants/discount.constant';

type Props = {
  product: any;
};

export default function ProductDetails({ product }: Props) {
  const textColor = useColorModeValue('gray.900', 'gray.400');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);

  const [isAllow, setIsAllow] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const [stock, setStock] = useState<any>(null);
  const [discount, setDiscount] = useState<any>(null);
  const [formData, setFormData] = useState({
    cartId: '',
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image: product.productImages[0]?.image,
    description: product.description,
    quantity: 0,
    price: product.price,
    discount: 0,
    isBuy1Get1: false,
  });

  useEffect(() => {
    (async () => {
      if (!user.id || user.role !== 'customer' || !user.isVerified) return;

      const dataCart = await getCartByUserID(user.id);
      if (!dataCart.id) return;

      setFormData((prevFormData) => ({
        ...prevFormData,
        cartId: dataCart.id,
      }));
      setIsAllow(true);

      const dataStores = await getDistanceStores({
        longitude: user.longitude,
        latitude: user.latitude,
      });
      setStores(dataStores);

      if (dataCart.storeId) {
        dispatch(
          updateCartStoreState({
            storeId: dataCart.storeId,
          }),
        );
      }
    })();
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      if (!product.id || !cart.storeId) return;

      const dataStock = await getStockByProductIdAndStoreId(
        product.id,
        cart.storeId,
      );
      setStock(dataStock);

      const dataDiscount = await getDiscountByProductIdAndStoreId(
        product.id,
        cart.storeId,
      );
      setDiscount(dataDiscount);

      if (dataDiscount) {
        if (dataDiscount?.type === DISCOUNT_TYPE.productDiscount) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            discount:
              dataDiscount.unit === DISCOUNT_UNIT.percentage
                ? Math.round((prevFormData.price * dataDiscount.amount) / 100)
                : dataDiscount.amount,
          }));
        } else if (dataDiscount?.type === DISCOUNT_TYPE.buy1Get1) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            isBuy1Get1: true,
          }));
        }
      }
    })();
  }, [product.id, cart.storeId]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const resetQuantity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: 0,
    }));
  };

  const validateQuantity = () => {
    if (formData.quantity < 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: 1,
      }));
    } else if (formData.quantity > stock.remainingStock) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: stock.remainingStock,
      }));
    }
  };

  const decrementQuantity = () => {
    if (formData.quantity > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: prevFormData.quantity - 1,
      }));
    }
  };

  const incrementQuantity = () => {
    if (formData.quantity < stock.remainingStock) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: prevFormData.quantity + 1,
      }));
    }
  };

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeStore = async (e: ChangeEvent) => {
    const newStoreId = e.target.value;
    if (!newStoreId) return;
    if (!confirm(`Update store will remove all cart items, do you want to continue?`)) return;

    try {
      const resultUpdate = await updateCart(formData.cartId, {
        storeId: newStoreId,
      });
      if (!resultUpdate) throw new Error('Update cart failed!');

      const resultReset = await resetCartItems(formData.cartId);
      if (!resultReset) throw new Error('Reset cart items failed!');

      dispatch(
        updateCartStoreState({
          storeId: newStoreId,
        }),
      );
      dispatch(
        updateCartItemsState({
          itemsCount: 0,
          itemsPrice: 0,
          itemsDiscount: 0,
        }),
      );

      resetQuantity();
      toast.success('Update store success');
    } catch (err) {
      console.error(err);
      toast.error('Update store failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const cartItem = await createCartItem(formData);
      if (!cartItem) throw new Error('Add to cart failed!');

      if (user.id) {
        const dataCart = await getCartByUserID(user.id);
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.length,
            itemsPrice: dataCart.itemsPrice,
            itemsDiscount: dataCart.itemsDiscount,
          }),
        );
      }

      resetQuantity();
      toast.success('Add to cart success');
    } catch (err) {
      console.error(err);
      toast.error('Add to cart failed');
    }
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Box>
          <ImageSlider
            images={product.productImages?.map((item: any) => item.image)}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product.name}
              </Heading>
            </Box>
            <Flex direction={'row'} gap={5} alignItems={'center'}>
              {formData.discount > 0 ? (
                <Flex alignItems="center" gap={5}>
                  <Text color={textColor} fontWeight={500} fontSize={'2xl'}>
                    {FormatCurrency(product.price - formData.discount)}
                  </Text>
                  <Text
                    color={textColor}
                    fontWeight={400}
                    fontSize={'xl'}
                    textDecoration={'line-through'}
                  >
                    {FormatCurrency(product.price)}
                  </Text>
                </Flex>
              ) : (
                <Text color={textColor} fontWeight={500} fontSize={'2xl'}>
                  {FormatCurrency(product.price)}
                </Text>
              )}
              {discount && discount?.type === DISCOUNT_TYPE.buy1Get1 && (
                <Badge variant="solid" colorScheme="green">
                  Buy 1 Get 1
                </Badge>
              )}
            </Flex>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={dividerColor} />}
            >
              <Text fontSize={'xl'} fontWeight={'300'}>
                {product.description}
              </Text>
              {isAllow && (
                <Stack spacing={6}>
                  <FormControl id="province">
                    <FormLabel>Store</FormLabel>
                    <Select
                      value={cart.storeId}
                      onChange={handleChangeStore}
                      placeholder="Select Store"
                    >
                      {stores?.map((store: any) => (
                        <option
                          key={store.id}
                          value={store.id}
                        >{`${store.name} - ${parseFloat(store.distance).toFixed(2)} km`}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="quantity">
                    <FormLabel>Quantity</FormLabel>
                    <Box display="inline-flex" mr={5}>
                      <IconButton
                        aria-label="left"
                        icon={<Icon as={FiMinus} />}
                        borderRightRadius={0}
                        onClick={decrementQuantity}
                        isDisabled={
                          !stock?.remainingStock || !formData.quantity
                        }
                      />
                      <Input
                        name="quantity"
                        placeholder="Quantity"
                        width={'50%'}
                        type="number"
                        borderRadius={0}
                        value={formData.quantity}
                        onChange={handleChange}
                        onBlur={validateQuantity}
                        isDisabled={!stock?.remainingStock}
                      />
                      <IconButton
                        aria-label="right"
                        icon={<Icon as={FiPlus} />}
                        borderLeftRadius={0}
                        onClick={incrementQuantity}
                        isDisabled={
                          !stock?.remainingStock ||
                          formData.quantity === stock?.remainingStock
                        }
                      />
                    </Box>
                    {stock?.remainingStock > 0 ? (
                      <>
                        <FormLabel display={'inline'}>Stock:</FormLabel>
                        <Text as={'span'}>{stock.remainingStock}</Text>
                      </>
                    ) : (
                      <FormLabel display={'inline'} color={'red.500'}>
                        Out of Stock
                      </FormLabel>
                    )}
                  </FormControl>
                </Stack>
              )}
            </Stack>
            {isAllow && (
              <Button
                rounded={'full'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={'green.600'}
                color={'white'}
                textTransform={'uppercase'}
                _hover={{ transform: 'translateY(2px)', boxShadow: 'lg' }}
                type="submit"
                isDisabled={!formData.quantity}
              >
                <FaCartPlus />
                <Text as={'span'} ml={5}>
                  Add to Cart
                </Text>
              </Button>
            )}
            <FormControl id="category">
              <FormLabel display={'inline'}>Category:</FormLabel>
              <Text as={'span'}>{product.category.name}</Text>
            </FormControl>
          </Stack>
        </form>
      </SimpleGrid>
    </Container>
  );
}
