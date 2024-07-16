import {
  Stack,
  useColorModeValue,
  Flex,
  useDisclosure,
  Text,
  Icon,
  Collapse,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { NAV_ITEMS } from "@/constants/navbar.constant";
import { NavItem } from "@/interface/navbar.interface";

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={5}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        _hover={{
          transform: 'translateY(-2px)',
          bgColor: 'gray.100',
        }}
        mt={2}
        pl={4}
        borderLeft={3}
        borderStyle={'solid'}
        borderColor={useColorModeValue('green', 'green')}
        align={'start'}
        alignItems="center"
      >
        <Text fontWeight={600} color={'black'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
          alignItems="center"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href ?? '#'}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNav;
