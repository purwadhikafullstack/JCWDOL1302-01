import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
          <FormControl>
            <FormLabel htmlFor="password">Password :</FormLabel>
            <InputGroup>
              <Field
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                style={{
                  padding: '5px',
                  border: '0.5px solid grey',
                  borderRadius: '5px',
                }}
              />
              <InputRightElement w={'fit'}>
                <Button
                  h={'auto'}
                  size="xl"
                  onClick={handleClick}
                  borderRadius="md"
                  p={2}
                  mb={1}
                  mr={0.5}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
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
          <Button
            sx={{
              marginTop: '15px',
            }}
            type="submit"
            disabled={isSubmitting}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign In
          </Button>
          <Link href="/sign-up">
            <Text
              color={'blue.400'}
              textAlign={'center'}
              _hover={{ color: 'blue.500' }}
            >
              {"Don't have account yet?"}
            </Text>
          </Link>
          <Link href="/forgot-password">
            <Text
              color={'blue.400'}
              textAlign={'center'}
              _hover={{ color: 'blue.500' }}
            >
              Forgot Password?
            </Text>
          </Link>
        </Stack>
      </Form>
    </Box>
  );
}
