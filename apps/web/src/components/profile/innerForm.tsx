import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
  Select,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';
import { useState } from 'react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { updateAvatar } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { toast } from 'react-toastify';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData();
      const inputFile = document.getElementById('image') as HTMLInputElement;
      formData.append('image', inputFile?.files?.item(0) as File);

      dispatch(updateAvatar(values.id, formData));
      toast.success('Update Avatar Success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
          <FormControl id="userName">
            <Stack spacing={4}>
              <Center>
                <Avatar
                  size="xl"
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/avatar/${values.image}`}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleUpdateAvatar}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="Name">
            <FormLabel>Name</FormLabel>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%',
              }}
              onChange={handleChange}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.name}
              </Text>
            )}
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%',
              }}
              onChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.email}
              </Text>
            )}
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Field
              name="phone"
              type="tel"
              placeholder="Phone number"
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%',
              }}
              onChange={handleChange}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.phone}
              </Text>
            )}
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%',
              }}
              onChange={handleChange}
              value={values.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl id="birthDate">
            <FormLabel>Birth date</FormLabel>
            <Field
              name="birthDate"
              type="date"
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%',
              }}
              onChange={handleChange}
              value={values.birthDate}
            />
            {touched.birthDate && errors.birthDate && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.birthDate}
              </Text>
            )}
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']} mt={15}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Box>
  );
}
