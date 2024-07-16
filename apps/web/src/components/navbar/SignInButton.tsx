import { Button, Stack } from "@chakra-ui/react"
import Link from "next/link"

const SignInButton = () => {
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={2}
    >
      <Link href="/sign-in">
        <Button
          p={{ base: '2', sm: '5' }}
          bg={'blue.400'}
          color={'white'}
          fontSize={'sm'}
          fontWeight={600}
          borderRadius={'lg'}
          _hover={{ bg: 'blue.500' }}
          cursor={'pointer'}
        >
          Sign In
        </Button>
      </Link>
    </Stack>
  )
}

export default SignInButton