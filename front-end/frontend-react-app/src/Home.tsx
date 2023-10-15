import React, { useEffect } from "react";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import NavBar from "./NavBar"
import { Container } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

export default function HomePage() {

  useEffect(() => {
    document.title = "Home - Voting System";
  }, []);
  
  return(
    <>
  <NavBar />
  <VStack>
    <Spacer />
    <Spacer />
    <Spacer />
    <Box padding='4' bg='teal.400' color='white' w="85%" border='2px' borderColor='teal'>
    RIGHT NOW: Candidate A vs Candidate B in Random Location's Presidental Race
    </Box>
    <HStack w="85%">
      <Container w="50px">
      </Container>
      <VStack>
        <Heading>Your Vote Matters!</Heading>
        <Container maxW="600">
          <Image boxSize='350px' w="500" objectFit='cover' src='https://s7d2.scene7.com/is/image/TWCNews/istock-generic-election-buttons-votingjpg3840x2160jpg' alt='Voting Icon' />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
          cupidatat non proident, sunt in
        </Container>
      </VStack>
      <VStack>
        <Container maxW='2xl' centerContent>
          <Box padding='4' bg='gray.100' color='black' maxW='md' border='2px' borderColor='teal'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. 
          </Box>
        </Container>
        <Container maxW='2xl' centerContent>
          <Box padding='4' bg='gray.100' color='black' maxW='md' border='2px' borderColor='teal'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. 
          </Box>
        </Container>
        <Container maxW='2xl' centerContent>
          <Box padding='4' bg='gray.100' color='black' maxW='md' border='2px' borderColor='teal'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. 
          </Box>
        </Container>
      </VStack>
      <Container w="50px">
      </Container>
    </HStack>
  </VStack>
</>
  )
}