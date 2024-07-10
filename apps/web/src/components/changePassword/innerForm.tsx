import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
  Input,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';
import { useRouter } from "next/navigation";

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;
  const router = useRouter();

  const validateConfirmPassword = (pass: string, value: string) => {
    let error = '';
    if (pass && value) {
      if (pass !== value) {
        error = 'Password not matched';
      }
    }
    return error;
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Stack
          spacing={6}
          w={'full'}
          rounded={'xl'}
          p={10}
          my={6}
        >
          <FormControl id="currentPassword" isRequired>
            <FormLabel htmlFor="currentPassword">Current Password </FormLabel>
            <Field
              name="currentPassword"
              type="password"
              onChange={handleChange}
              value={values.currentPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%'
              }}
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.currentPassword}
              </Text>
            )}
          </FormControl>
          <FormControl id="newPassword" isRequired>
            <FormLabel htmlFor="newPassword">New Password </FormLabel>
            <Field
              name="newPassword"
              type="password"
              onChange={handleChange}
              value={values.newPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%'
              }}
            />
            {touched.newPassword && errors.newPassword && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.newPassword}
              </Text>
            )}
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel htmlFor="password">Confirm Password </FormLabel>
            <Field
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
                width: '100%'
              }}
              validate={() =>
                validateConfirmPassword(values.newPassword, values.confirmPassword)
              }
            />
            {errors.confirmPassword && (
              <Text p={5} textAlign={'center'} color={'red'}>
                {errors.confirmPassword}
              </Text>
            )}
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              onClick={() => {
                router.push("/users");
              }}
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            {errors.confirmPassword ? (
              <Button
                type="submit"
                disabled
                bg={'gray.400'}
                w="full"
                color={'white'}
                cursor={'not-allowed'}
              >
                Update
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                bg={'blue.400'}
                w="full"
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Update
              </Button>
            )}
          </Stack>
        </Stack>
      </Form>
    </Box>
  );
}
