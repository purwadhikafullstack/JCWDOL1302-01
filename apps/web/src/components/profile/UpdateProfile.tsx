'use client';

import { Box, Card, CardBody, Text } from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import InnerForm from './innerForm';
import { updateProfile } from '@/lib/features/auth/authSlice';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

export default function UserProfileEdit(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const UpdateProfileForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      id: props.initialId || user.id || '',
      name: props.initialName || user.name || '',
      email: props.initialEmail || user.email || '',
      image: props.initialImage || user.image || '',
      phone: props.initialPhone || user.phone || '',
      gender: props.initialGender || user.gender || '',
      birthDate:
        props.initialBirthDate ||
        format(new Date(user.birthDate as string), 'dd/MM/yyyy') ||
        '',
    }),
    validationSchema: UpdateProfileSchema,
    enableReinitialize: true,
    handleSubmit(
      { name, email, phone, gender, birthDate }: FormValues,
      { resetForm },
    ) {
      dispatch(
        updateProfile(user.id as string, {
          name,
          email,
          phone,
          gender,
          birthDate,
        }),
      );
      resetForm();
      toast.success('Update user profile success');
      router.push('/users/profile');
    },
  })(InnerForm);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Profile
      </Text>
      <Card my={10}>
        <CardBody>
          <UpdateProfileForm />
        </CardBody>
      </Card>
    </Box>
  );
}
