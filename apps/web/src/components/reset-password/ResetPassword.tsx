'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
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
import { resetPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
});

const ResetPassword = () => {
  const params = useSearchParams();
  const token = params.toString().replace('token=', '');
  const router = useRouter();

  const ResetPasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword1 || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    async handleSubmit({ password }: FormValues, { resetForm }) {
      try {
        const data = await resetPassword({ token, password });
        if (data) {
          localStorage.removeItem('resetPassword');
        }
        resetForm();
        toast.success(data.message);
        router.push('/sign-in');
      } catch (err: any) {
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
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}>Reset Password</Heading>
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
              <ResetPasswordForm />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
