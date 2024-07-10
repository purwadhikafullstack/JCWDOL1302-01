'use client';

import React, { ReactNode } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome, FiUser } from 'react-icons/fi';
import { FaAddressBook, FaAtlas, FaPager, FaTicketAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import AuthCustomer from '@/components/auth/AuthCustomer';
import MobileNavUser from '@/components/navbar/users/MobileNavUser';
import SidebarUser from '@/components/navbar/users/SidebarUser';

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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AuthCustomer>
      <Box
        bgImage={'/assets/images/bgline.png'}
        bgSize={{ base: 'cover', sm: 'cover' }}
      >
        <SidebarUser
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
          zIndex={100}
          bgGradient="linear(to-b, white, blue.500, green.200)"
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarUser onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNavUser onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p={5}>
          {children}
        </Box>
      </Box>
    </AuthCustomer>
  );
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

// const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
//   return (
//     <Box
//       transition="3s ease"
//       bg={useColorModeValue('white', 'gray.900')}
//       borderRight="1px"
//       borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//       w={{ base: 'full', md: 60 }}
//       pos="fixed"
//       h="full"
//       // pt={10}
//       {...rest}
//     >
//       <Flex
//         h="20"
//         alignItems="center"
//         mx="8"
//         mb={10}
//         mt={5}
//         justifyContent="space-between"
//       >
//         <Link href="/">
//           <Image src="/assets/images/logo.png" alt="logo" w={150} />
//         </Link>
//         <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
//       </Flex>
//       {LinkItems.map((link) => (
//         <NavItem key={link.name} icon={link.icon} href={link.href}>
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   href: string;
//   children: ReactText;
// }
// const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
//   return (
//     <Link href={href} style={{ textDecoration: 'none' }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: 'blue.400',
//           color: 'white',
//         }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: 'white',
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
// const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
//   const { status, user } = useAppSelector((state) => state.auth);
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue('white', 'gray.900')}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       justifyContent={{ base: 'space-between', md: 'flex-end' }}
//       {...rest}
//     >
//       <IconButton
//         display={{ base: 'flex', md: 'none' }}
//         onClick={onOpen}
//         variant="outline"
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <HStack spacing={{ base: '0', md: '6' }}>
//         <Flex alignItems={'center'}>
//           <Menu>
//             <MenuButton
//               py={2}
//               transition="all 0.3s"
//               _focus={{ boxShadow: 'none' }}
//             >
//               <HStack>
//                 <Avatar
//                   size={{ base: 'sm', sm: 'md' }}
//                   src={user.image}
//                   ml={2}
//                 />
//                 <VStack
//                   display={{ base: 'none', md: 'flex' }}
//                   alignItems="flex-start"
//                   spacing="1px"
//                   ml="2"
//                 >
//                   <Text fontSize="sm">{user.email}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     {user.role}
//                   </Text>
//                 </VStack>
//                 <Box display={{ base: 'none', md: 'flex' }}>
//                   <FiChevronDown />
//                 </Box>
//               </HStack>
//             </MenuButton>
//             <MenuList
//             // bg={useColorModeValue('white', 'gray.900')}
//             // borderColor={useColorModeValue('gray.200', 'gray.700')}
//             >
//               <MenuItem
//                 onClick={() => {
//                   router.push(
//                     user.role === 'super_admin' || user.role === 'store_admin'
//                       ? '/admin'
//                       : '/users',
//                   );
//                 }}
//               >
//                 Dashboard
//               </MenuItem>
//               <MenuDivider />
//               <MenuItem
//                 onClick={() => {
//                   dispatch(signOut());
//                   router.push('/');
//                 }}
//               >
//                 Sign out
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//       </HStack>
//     </Flex>
//   );
// };
