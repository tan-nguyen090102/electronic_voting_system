import React, { useEffect } from "react";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - Voting System";
  }, []);

  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
      <VStack spacing={4} align='stretch'>
      <Heading>This is Home page</Heading>
      <HStack spacing='24px' >
      <Spacer />
        <Link href='/login'>
        <Button colorScheme='teal'>Log In</Button>
        </Link>
        <Link href='/signup'>
        <Button colorScheme='teal'>Sign Up</Button>
        </Link>
      <Spacer />
      </HStack>
      </VStack>
      </Center>
      </Flex>
  );
}
