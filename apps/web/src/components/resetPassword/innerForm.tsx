import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

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
        <Stack spacing={4}>
          <FormControl id="password">
            <FormLabel htmlFor="password">New Password </FormLabel>
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
            />
            {touched.password && errors.password && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.password}
              </Text>
            )}
          </FormControl>
          <FormControl id="password1">
            <FormLabel htmlFor="password">Confirm Password </FormLabel>
            <Field
              name="password1"
              type="password"
              onChange={handleChange}
              value={values.password1}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
              validate={() =>
                validateConfirmPassword(values.password, values.password1)
              }
            />
            {errors.password1 && (
              <Text p={5} textAlign={'center'} color={'red'}>
                {errors.password1}
              </Text>
            )}
          </FormControl>
          {errors.password1 ? (
            <Button
              sx={{
                marginTop: '15px',
              }}
              type="submit"
              disabled
              bg={'gray.400'}
              color={'white'}
              cursor={'not-allowed'}
            >
              Reset Password
            </Button>
          ) : (
            <Button
              sx={{
                marginTop: '15px',
              }}
              type="submit"
              disabled={isSubmitting}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
            >
              Reset Password
            </Button>
          )}
        </Stack>
      </Form>
    </Box>
  );
}
