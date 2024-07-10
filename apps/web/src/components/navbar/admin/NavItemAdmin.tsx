import { FlexProps, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactText } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
  onClose: () => void;
}

const NavItemAdmin = ({
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

export default NavItemAdmin;
