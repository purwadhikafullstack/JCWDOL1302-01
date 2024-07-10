'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from '@/types';
import { IUsers } from '@/interface/user.interface';
import InnerForm from './components/innerForm';
import instance from '@/utils/axiosInstance';
import PageWrapper from '../pageWrapper';
import { toast } from 'react-toastify';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  // password: Yup.string().required('Password is required'),
});

const RegisterView = () => {
  const router = useRouter();

  const register = async ({ email }: IUsers) => {
    try {
      const form = new FormData();
      form.append('email', email);
      const { data } = await instance.post('/auth/register', form);
      toast.success(data?.message);
    } catch (err) {
      console.error(err);
      toast.error('Email already exist, please Sign in');
    }
  };

  const RegisterForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword || '',
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      register({ email, password });
      resetForm();
      router.push('/sign-in');
    },
  })(InnerForm);

  return (
    <PageWrapper>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        shadow={'2xl'}
        bgImage={'/assets/images/bgline.png'}
        bgSize={{ base: 'cover', sm: 'cover' }}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'3xl'}
              backgroundColor={'white'}
              borderRadius={'2xl'}
              p={2}
            >
              Sign Up
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
              <RegisterForm />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </PageWrapper>
  );
};

export default RegisterView;
