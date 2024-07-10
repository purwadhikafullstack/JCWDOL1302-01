import { FlexProps, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactText } from 'react';
import { IconType } from 'react-icons';
import { FaPager, FaAddressBook, FaAtlas, FaTicketAlt } from 'react-icons/fa';
import { FiHome, FiUser } from 'react-icons/fi';

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
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

const NavItemUser = ({
  icon,
  href,
  children,
  onClose,
  ...rest
}: NavItemProps) => {
  const handleClick = () => {
    onClose();
  };
  return (
    <Link href={href} onClick={handleClick} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItemUser;
