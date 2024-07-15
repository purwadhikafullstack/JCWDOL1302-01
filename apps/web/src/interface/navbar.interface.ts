import { IconType } from "react-icons";

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface UserLinkItem {
  name: string;
  icon: IconType;
  href: string;
  key: string;
}