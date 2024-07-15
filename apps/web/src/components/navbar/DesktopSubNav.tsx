import {
  Link,
  Stack,
  Box,
  Text,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { NavItem } from "@/interface/navbar.interface";

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('gray.200', 'gray.100') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.500' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

export default DesktopSubNav;
