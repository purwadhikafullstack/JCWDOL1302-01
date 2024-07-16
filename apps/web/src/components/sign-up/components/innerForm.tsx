import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
  Divider,
  Center,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel htmlFor="email">Email :</FormLabel>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
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
            Sign Up
          </Button>
          <Link href="/sign-in">
            <Text
              color={'blue.400'}
              textAlign={'center'}
              _hover={{ color: 'blue.500' }}
            >
              Already have account?
            </Text>
          </Link>
          <Divider />
          <Button variant={'none'}>
            <Text
              color={'blue.400'}
              textAlign={'center'}
              _hover={{ color: 'blue.500' }}
            >
              Redeem referral code
            </Text>
          </Button>
          <Center flex={'1'} flexDirection={'column'}>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              onClick={() => {
                // signInNextAuth('google', { callbackUrl });
              }}
            >
              <Center>
                <Text>Sign Up with Google</Text>
              </Center>
            </Button>
          </Center>
        </Stack>
      </Form>
    </Box>
  );
}
