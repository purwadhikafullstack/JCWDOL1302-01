'use client';

import ProductForm from './ProductForm';
import {
  Box,
  Container,
  SimpleGrid,
  ImageSlider,
  toast,
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  getDistanceStores,
  updateCartItemsState,
  updateCartStoreState,
} from './imports/import';

type Props = {
  product: any;
};

export default function ProductDetails({ product }: Props) {
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

  const handleChangeStore = async (e: ChangeEvent) => {
    const newStoreId = e.target.value;
    if (!newStoreId) return;
    if (
      !confirm(
        `Update store will remove all cart items, do you want to continue?`,
      )
    )
      return;

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
        <ProductForm
          product={product}
          stores={stores}
          stock={stock}
          cart={cart}
          isAllow={isAllow}
          formData={formData}
          setFormData={setFormData}
          handleChangeStore={handleChangeStore}
          handleSubmit={handleSubmit}
          discount={discount}
          setStock={setStock}
          setDiscount={setDiscount}
        />
      </SimpleGrid>
    </Container>
  );
}
