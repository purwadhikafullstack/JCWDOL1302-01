'use client';
import {
  BoxProps,
  Box,
  useColorModeValue,
  Flex,
  Image,
  CloseButton,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FaPager, FaAddressBook, FaAtlas, FaTicketAlt } from 'react-icons/fa';
import { FiHome, FiUser } from 'react-icons/fi';
import NavItemUser from './NavItemsUser';

interface SidebarProps extends BoxProps {
  onClose: () => void;
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

const SidebarUser = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <>
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        bgGradient="linear(to-b, white, blue.500, green.200)"
        {...rest}
      >
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          mb={10}
          mt={5}
          justifyContent="space-between"
        >
          <Link href="/">
            <Image src="/assets/images/logo.png" alt="logo" w={150} />
          </Link>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItemUser
            key={link.name}
            icon={link.icon}
            href={link.href}
            onClose={onClose}
          >
            {link.name}
          </NavItemUser>
        ))}

        <Text align={'center'} pt={200}>
          © Mind Groceries, 2024
        </Text>
      </Box>
    </>
  );
};
export default SidebarUser;
