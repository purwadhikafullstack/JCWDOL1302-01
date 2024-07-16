'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Flex,
  Stack,
  useColorModeValue,
  Divider,
  Center,
  Button,
  Text,
} from '@chakra-ui/react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { signIn as signInNextAuth } from 'next-auth/react';

import { FormValues, FormProps } from './types';

import InnerForm from './components/innerForm';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type Props = {
  callbackUrl?: string;
  authError?: string | null;
};

const LoginView = ({ callbackUrl, authError }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword || '',
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    async handleSubmit({ email, password }: FormValues, { resetForm }) {
      try {
        const result = await dispatch(signIn({ email, password }));
        if (!result) throw new Error('Email atau Password salah');
        resetForm();
        if (localStorage.getItem('lastVisitedPage')) {
          router.push(`${localStorage.getItem('lastVisitedPage')}`);
        } else {
          router.push('/');
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.message);
      }
    },
  })(InnerForm);

  return (
    <Box>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        shadow={'2xl'}
        bgImage={'/assets/images/bgline1.png'}
        bgSize={{ base: 'cover', sm: 'cover', md: 'cover', lg: 'cover' }}
        bgRepeat={'no-repeat'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'3xl'}
              backgroundColor={'white'}
              borderRadius={'2xl'}
              p={2}
            >
              Sign In
            </Heading>
          </Stack>
          <Divider />
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={{ base: '6', sm: '12' }}
            display="flex"
            sx={{
              justifyContent: 'center',
            }}
          >
            <Stack spacing={8}>
              <LoginForm />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginView;
