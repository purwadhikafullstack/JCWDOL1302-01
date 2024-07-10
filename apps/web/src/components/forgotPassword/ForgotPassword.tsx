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
import { FormValues, FormProps } from './types';
import InnerForm from './innerForm';
import PageWrapper from '../pageWrapper';
import { forgotPassword } from "@/services/auth.service";
import { toast } from "react-toastify";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const router = useRouter();

  const ForgotPasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
    }),
    validationSchema: ForgotPasswordSchema,
    enableReinitialize: true,
    async handleSubmit({ email }: FormValues, { resetForm }) {
      try {
        const data = await forgotPassword({ email });
        resetForm();
        toast.success(data.message);
        router.push('/sign-in');
      } catch (err: any) {
        toast.error(err.message);
      }
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
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}>Forgot Password</Heading>
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
              <ForgotPasswordForm />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </PageWrapper>
  );
};

export default ForgotPassword;
