'use client';

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Image,
  Text,
  Avatar,
  VStack,
  HStack,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  AvatarBadge,
  Badge,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { USER_ROLE } from '@/constants/user.constant';
import SignInButton from "./SignInButton";

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
              variant={'ghost'}
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
            <Flex display={{ base: 'none', md: 'flex' }} m={'auto'}>
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
                  <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <HStack>
                      <Avatar
                        size={{ base: 'sm', sm: 'md' }}
                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/avatar/${user.image}`}
                        ml={2}
                        name={user?.name || user?.email}
                      >
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                      </Avatar>
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="sm">{user?.name || user?.email}</Text>
                        <Text fontSize="xs" color="gray.600">
                          {USER_ROLE[user?.role as string]}
                        </Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList zIndex={10}>
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