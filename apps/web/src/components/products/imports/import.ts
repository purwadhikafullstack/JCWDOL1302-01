import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  Icon,
  Badge,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import ImageSlider from './../ImageSlider';
import { toast } from 'react-toastify';
import {
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
} from '@/services/cart.service';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { getDistanceStores } from '@/services/store.service';
import {
  updateCartItemsState,
  updateCartStoreState,
} from '@/lib/features/cart/cartSlice';
import { getStockByProductIdAndStoreId } from '@/services/stock.service';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { getDiscountByProductIdAndStoreId } from '@/services/discount.service';
import { DISCOUNT_TYPE, DISCOUNT_UNIT } from '@/constants/discount.constant';
import Link from 'next/link';
import AddToCartButton from './../AddToCartButton';

export {
  FormatCurrency,
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  Icon,
  Badge,
  Alert,
  AlertIcon,
  ImageSlider,
  toast,
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  getDistanceStores,
  updateCartItemsState,
  updateCartStoreState,
  getStockByProductIdAndStoreId,
  FiMinus,
  FiPlus,
  getDiscountByProductIdAndStoreId,
  DISCOUNT_TYPE,
  DISCOUNT_UNIT,
  Link,
  AddToCartButton,
};
