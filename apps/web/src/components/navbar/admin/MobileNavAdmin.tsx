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
  AvatarBadge,
  VStack,
  Box,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from '@chakra-ui/react';
import { signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { USER_ROLE } from '@/constants/user.constant';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNavAdmin = ({ onOpen, ...rest }: MobileProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

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

export default MobileNavAdmin;
