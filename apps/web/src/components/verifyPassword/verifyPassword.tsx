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
import { FormValues, FormProps } from '@/types';
import { IUsers } from '@/interface/user.interface';
import InnerForm from './component/innerForm';
import instance from '@/utils/axiosInstance';
import PageWrapper from '../pageWrapper';
import { toast } from 'react-toastify';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  password1: Yup.string().required('Confirm Password is required'),
});

const VerifyView = () => {
  const params = useSearchParams();
  const router = useRouter();

  const verify = async ({ password }: IUsers) => {
    try {
      const param = params.toString().replace('token=', '');
      await instance.post(
        '/auth/verify',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${param}`,
          },
        },
      );
      toast.success('Account verified, please Sign In');
      router.push('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword1 || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      verify({ email, password });
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
              Set Password
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
    </PageWrapper>
  );
};

export default VerifyView;
