'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, Card, CardBody } from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import InnerForm from './innerForm';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { updatePassword } from '@/services/user.service';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string().required('New Password is required'),
  confirmPassword: Yup.string().required('Confirm Password is required'),
});

const ChangePassword = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const ChangePasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      currentPassword: props.initialCurrentPassword || '',
      newPassword: props.initialNewPassword || '',
      confirmPassword: props.initialConfirmPassword || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    async handleSubmit(
      { currentPassword, newPassword }: FormValues,
      { resetForm },
    ) {
      try {
        const data = await updatePassword(user.id as string, {
          currentPassword,
          newPassword,
        });
        resetForm();
        toast.success(data.message);
        router.push('/users');
      } catch (err: any) {
        toast.error(err.message);
      }
    },
  })(InnerForm);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Change Password
      </Text>
      <Card my={10}>
        <CardBody>
          <ChangePasswordForm />
        </CardBody>
      </Card>
    </Box>
  );
};

export default ChangePassword;
