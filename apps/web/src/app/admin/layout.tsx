'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { FiHome, FiUser } from 'react-icons/fi';
import {
  FaCashRegister,
  FaCcDiscover,
  FaChartArea,
  FaChartLine,
  FaShopify,
  FaStore,
  FaTicketAlt,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import AuthAdmin from '@/components/auth/AuthAdmin';
import { useAppSelector } from '@/lib/hooks';
import SidebarAdmin from '@/components/navbar/admin/SidebarAdmin';
import MobileNavAdmin from '@/components/navbar/admin/MobileNavAdmin';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  key: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector((state) => state.auth.user);
  const [linkItems, setLinkItems] = useState<Array<LinkItemProps>>([]);

  useEffect(() => {
    if (!user.role) return;
    const items = [{ name: 'Home', icon: FiHome, href: '/admin', key: 'Home' }];

    if (user.role === 'super_admin') {
      items.push(
        ...[
          { name: 'User', icon: FiUser, href: '/admin/users', key: 'User' },
          { name: 'Store', icon: FaStore, href: '/admin/stores', key: 'Store' },
        ],
      );
    }

    items.push(
      ...[
        {
          name: 'Category',
          icon: FaCcDiscover,
          href: '/admin/categories',
          key: 'Category',
        },
        {
          name: 'Product',
          icon: FaShopify,
          href: '/admin/products',
          key: 'Product',
        },
      ],
    );

    if (user.role === 'store_admin') {
      items.push({
        name: 'Discount',
        icon: FaTicketAlt,
        href: '/admin/discounts',
        key: 'Discount',
      });
    }

    items.push(
      ...[
        {
          name: 'Transaction',
          icon: FaCashRegister,
          href: '/admin/transactions',
          key: 'Transaction',
        },
        {
          name: 'Sales Report',
          icon: FaChartArea,
          href: '/admin/report/sales',
          key: 'Sales Report',
        },
        {
          name: 'Stock Report',
          icon: FaChartLine,
          href: '/admin/report/stock',
          key: 'Stock Report',
        },
      ],
    );

    setLinkItems(items);
  }, [user.role]);

  return (
    <AuthAdmin>
      <Box>
        <SidebarAdmin
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
          zIndex={100}
          linkItems={linkItems}
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
            <SidebarAdmin onClose={onClose} linkItems={linkItems} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNavAdmin onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p={5}>
          {children}
        </Box>
      </Box>
    </AuthAdmin>
  );
}
