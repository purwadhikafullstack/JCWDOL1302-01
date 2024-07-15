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
import NavItemAdmin from './NavItemAdmin';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: Array<LinkItemProps>;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  key: string;
}

const SidebarAdmin = ({ onClose, linkItems, ...rest }: SidebarProps) => {
  return (
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
        mb={5}
        mt={5}
        mx="8"
        justifyContent="space-between"
      >
        <Link href="/">
          <Image src="/assets/images/logo.png" alt="logo" w={150} />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItemAdmin
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClose={onClose}
        >
          {link.name}
        </NavItemAdmin>
      ))}
    </Box>
  );
};

export default SidebarAdmin;