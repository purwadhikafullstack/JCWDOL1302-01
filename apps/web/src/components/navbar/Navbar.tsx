'use client';
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Image,
  HStack,
  MenuItem,
  Menu,
  MenuList,
  MenuDivider,
  Badge,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FiShoppingCart } from 'react-icons/fi';
import { signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import SignInButton from './SignInButton';
import NavbarAvatar from './NavbarAvatar';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { status, user } = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('gray.50', 'gray.900')}
          color={useColorModeValue('gray.700', 'gray.200')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          shadow={'lg'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'outline'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link href="/">
              {user.role === 'store_admin' || user.role === 'super_admin' ? (
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  w={{ base: 20, sm: 120 }}
                  mr={{ base: 36, sm: 0 }}
                />
              ) : (
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  w={{ base: 20, sm: 120 }}
                />
              )}
            </Link>
            <Flex
              display={{ base: 'none', md: 'flex' }}
              align={'center'}
              m={'auto'}
            >
              <DesktopNav />
            </Flex>
          </Flex>
          {status.isLogin ? (
            <HStack spacing={{ base: '0', md: '6' }}>
              {user.role === 'customer' && (
                <Flex alignItems={'center'} mr={1}>
                  <Link href={'/cart'}>
                    <Stack position="relative">
                      <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiShoppingCart />}
                        ml={2}
                      />
                      {cart.itemsCount > 0 && (
                        <Badge
                          width={6}
                          height={6}
                          colorScheme="green"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          rounded="full"
                          top="0"
                          right="-5px"
                          position="absolute"
                        >
                          {cart.itemsCount}
                        </Badge>
                      )}
                    </Stack>
                  </Link>
                </Flex>
              )}
              <Flex alignItems={'center'}>
                <Menu>
                  <NavbarAvatar user={user} />
                  <MenuList zIndex={10}>
                    {!user.isVerified && (
                      <MenuItem textAlign={'center'} justifyContent={'center'}>
                        <Badge
                          colorScheme="red"
                          fontSize={'x-small'}
                          display={{
                            base: 'block',
                            md: 'none',
                            sm: 'block',
                            lg: 'none',
                          }}
                        >
                          Unverified
                        </Badge>
                      </MenuItem>
                    )}

                    <MenuItem
                      onClick={() => {
                        router.push(
                          user.role === 'super_admin' ||
                            user.role === 'store_admin'
                            ? '/admin'
                            : '/users',
                        );
                      }}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        dispatch(signOut());
                        router.push('/');
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>
          ) : (
            <SignInButton />
          )}
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </>
  );
}
