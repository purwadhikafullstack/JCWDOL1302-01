import { Alert, AlertIcon, Button, Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from 'react'
import { getAddresses } from "@/services/address.service";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartDestinationState } from "@/lib/features/cart/cartSlice";

type Props = {
  store: any;
}

const ShippingAddress = ({ store }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAddresses({ userId: user.id as string, size: 1000 });
      setAddresses(data?.addresses || []);
    })()
  }, [user.id]);

  const address = useMemo(() => addresses?.find(address => address.id === cart.userAddressId), [addresses, cart.userAddressId]);

  const handleChangeAddress = (e: any) => {
    const newUserAddressId = e.target.value;
    const data = addresses?.find(address => address.id === newUserAddressId);

    dispatch(updateCartDestinationState({
      destination: data?.subdistrictId,
      userAddressId: newUserAddressId
    }));
  }

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Shipping Address
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <FormControl id="label">
          <FormLabel>Label Address</FormLabel>
          <Flex gap={4}>
            <Select
              width="auto"
              value={cart.userAddressId}
              onChange={handleChangeAddress}
              flexGrow={1}
            >
              <option value="">- Select Label Address -</option>
              {addresses?.map((address: any) => (
                <option
                  key={address.id}
                  value={address.id}
                >{address.label}</option>
              ))}
            </Select>
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/users/address`);
              }}
            >
              Add
            </Button>
          </Flex>
        </FormControl>
        <FormControl id="address">
          <FormLabel>Customer Address</FormLabel>
          {cart.userAddressId ? (
            <Text>{address?.address ? `${address?.address}, ${address?.subdistrictName}, ${address?.cityName}, ${address?.provinceName} ${address?.postalCode || ''}` : '-'}</Text>
          ) : (
            <Alert status='info' borderRadius={5} mt={4}>
              <AlertIcon />
              Please select label address first!
            </Alert>
          )}
        </FormControl>
        <FormControl id="address">
          <FormLabel>Store Address</FormLabel>
          <Text>{store?.address ? `${store?.name}, ${store?.address}, ${store?.subdistrictName}, ${store?.cityName}, ${store?.provinceName} ${store?.postalCode || ''}` : '-'}</Text>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default ShippingAddress