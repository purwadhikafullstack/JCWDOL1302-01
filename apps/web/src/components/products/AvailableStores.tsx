import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import React from 'react'
import { FaStore } from "react-icons/fa";

type Props = {
  stores: any[];
}

const AvailableStores = ({ stores = [] }: Props) => {
  return (
    <Stack flexDirection={'column'} textAlign={'center'} h={'full'}>
      <Text as={'b'} fontSize={'4xl'}>
        Our Products only available in Stores below:{' '}
      </Text>
      <Box m={2} justifyContent={'center'} mt={10}>
        {stores.map((store: any, index: number) => (
          <Flex
            key={index}
            display="inline-flex"
            backgroundColor={'white'}
            cursor={'default'}
            m={2}
            alignItems="center"
            borderRadius={5}
            width="max-content"
            p={1}
            pr={4}
          >
            <Icon as={FaStore} color="green.500" m={2} />
            {store.name}
          </Flex>
        ))}
      </Box>
    </Stack>
  )
}

export default AvailableStores