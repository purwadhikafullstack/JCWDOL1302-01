import { USER_ROLE } from '@/constants/user.constant';
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  HStack,
  MenuButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Props = {
  user: any;
};
const NavbarAvatar = ({ user }: Props) => {
  return (
    <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
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
          {!user.isVerified && (
            <Badge
              colorScheme="red"
              fontSize={'x-small'}
              display={{ base: 'none', md: 'flex', sm: 'none', lg: 'flex' }}
            >
              Unverified
            </Badge>
          )}
        </VStack>
        <Box display={{ base: 'none', md: 'flex' }}>
          <FiChevronDown />
        </Box>
      </HStack>
    </MenuButton>
  );
};

export default NavbarAvatar;
