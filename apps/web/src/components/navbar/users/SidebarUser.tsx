'use client';
import {
  BoxProps,
  Box,
  useColorModeValue,
  Flex,
  Image,
  CloseButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import NavItemUser from './NavItemsUser';
import { USER_LINK_ITEMS } from '@/constants/navbar.constant';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

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
        {...rest}
      >
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          mb={5}
          mt={5}
          justifyContent="space-between"
        >
          <Link href="/" onClick={onClose}>
            <Image src="/assets/images/logo.png" alt="logo" w={150} />
          </Link>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {USER_LINK_ITEMS.map((link) => (
          <NavItemUser
            key={link.name}
            icon={link.icon}
            href={link.href}
            onClose={onClose}
          >
            {link.name}
          </NavItemUser>
        ))}
      </Box>
    </>
  );
};

export default SidebarUser;
