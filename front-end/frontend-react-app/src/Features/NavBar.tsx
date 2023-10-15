import React, { useEffect } from "react";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

export default function NavBar() {
    var isLoggedIn = false;

    if (isLoggedIn){
        return (
          <Flex minH={'60px'}  py={{ base: 2 }} px={{ base: 4 }} borderBottom={3} borderStyle={'solid'} 
          borderColor={'teal'} background="gray.100" p={4} align={'center'}>
            <Flex flex={{base:1}} justify={{base: 'center', md: 'start'}}>
              <Image boxSize='50px' objectFit='cover' src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3415254/election-day-clipart-md.png' alt='Voting Icon' />
              <HStack spacing='24px' >
                <Spacer />
                <Heading>My Vote</Heading>
              </HStack>
            </Flex>
    
            <Flex flex={{base:1}} justify={{base: 'center', md: 'end'}}>
              <HStack spacing='24px'>
                <Button colorScheme='teal'>User Profile</Button>
                <Link href='/login'>
                <Button colorScheme='teal'>
                Log Out
                </Button>
                </Link>
              </HStack>
            </Flex>
          </Flex>
        );
      }
    
      else{
        return (
          <Flex minH={'60px'}  py={{ base: 2 }} px={{ base: 4 }} borderBottom={3} borderStyle={'solid'} 
          borderColor={'teal'} background="gray.100" p={4} align={'center'}>
            <Flex flex={{base:1}} justify={{base: 'center', md: 'start'}}>
              <Image boxSize='50px' objectFit='cover' src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3415254/election-day-clipart-md.png' alt='Voting Icon' />
              <HStack spacing='24px' >
                <Spacer />
                <Heading>My Vote</Heading>
              </HStack>
            </Flex>
    
            <Flex flex={{base:1}} justify={{base: 'center', md: 'end'}}>
              <HStack spacing='24px'>
                <Link href='/login'>
                  <Button colorScheme='teal'>Log in</Button>
                </Link>
                <Link href='/signup'>
                  <Button colorScheme='teal'>Sign up</Button>
                </Link>
              </HStack>
            </Flex>
         </Flex>
        );
      }
}

export{}