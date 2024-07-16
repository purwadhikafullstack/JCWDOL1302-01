import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

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
            <FormLabel htmlFor="password">Password </FormLabel>
            <InputGroup>
              <Field
                name="password"
                type={show ? 'text' : 'password'}
                onChange={handleChange}
                placeholder="Password"
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
          <FormControl id="password1">
            <FormLabel htmlFor="password">Confirm Password </FormLabel>
            <InputGroup>
              <Field
                name="password1"
                type={show1 ? 'text' : 'password'}
                onChange={handleChange}
                value={values.password1}
                placeholder="Password"
                style={{
                  padding: '5px',
                  border: '0.5px solid grey',
                  borderRadius: '5px',
                }}
                validate={() =>
                  validateConfirmPassword(values.password, values.password1)
                }
              />
              <InputRightElement w={'fit'}>
                <Button
                  h={'auto'}
                  size="xl"
                  onClick={handleClick1}
                  borderRadius="md"
                  p={2}
                  mb={1}
                  mr={0.5}
                >
                  {show1 ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>

            {touched.password1 && errors.password1 && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
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
              Submit
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
              Submit
            </Button>
          )}
        </Stack>
      </Form>
    </Box>
  );
}
