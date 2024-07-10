'use client';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  AvatarBadge,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { FaPager, FaAddressBook, FaAtlas, FaTicketAlt } from 'react-icons/fa';
import {
  FiHome,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiShoppingCart,
} from 'react-icons/fi';
import { signOut } from '@/lib/features/auth/authSlice';
import { USER_ROLE } from '@/constants/user.constant';
import Link from 'next/link';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  key: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/users', key: 'Home' },
  { name: 'Profile', icon: FiUser, href: '/users/profile', key: 'Profile' },
  {
    name: 'Change Password',
    icon: FaPager,
    href: '/users/change-password',
    key: 'Change Password',
  },
  {
    name: 'Address',
    icon: FaAddressBook,
    href: '/users/address',
    key: 'Address',
  },
  {
    name: 'Orders',
    icon: FaAtlas,
    href: '/users/orders',
    key: 'Orders',
  },
  {
    name: 'Vouchers',
    icon: FaTicketAlt,
    href: '/users/vouchers',
    key: 'Vouchers',
  },
];

const MobileNavUser = ({ onOpen, ...rest }: MobileProps) => {
  const { status, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

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
            <MenuList>
              <MenuItem
                onClick={() => {
                  router.push(
                    user.role === 'super_admin' || user.role === 'store_admin'
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
    </Flex>
  );
};

export default MobileNavUser;