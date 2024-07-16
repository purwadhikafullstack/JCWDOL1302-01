import { NavItem, UserLinkItem } from "@/interface/navbar.interface";
import { FaAddressBook, FaAtlas, FaPager } from "react-icons/fa";
import { FiHome, FiUser } from "react-icons/fi";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'About us',
    href: '/about-us',
  },
];

export const USER_LINK_ITEMS: Array<UserLinkItem> = [
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
];