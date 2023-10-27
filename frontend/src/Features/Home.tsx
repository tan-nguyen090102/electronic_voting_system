import { useEffect } from "react";
import {
  Heading,
  Spacer,
  Image,
  Container,
  Box,
  Stack,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - Voting System";
  }, []);

  return (
    <>
      <NavBar isLoggedIn={false} />
      <Stack direction="column">
        <Spacer />
        <Spacer />
        <Spacer />
        <Box
          padding="4"
          bg="teal.400"
          color="white"
          w="85%"
          border="2px"
          borderColor="teal"
        >
          RIGHT NOW: Candidate A vs Candidate B in Random Location's Presidental
          Race
        </Box>
        <Stack direction="row" w="85%">
          <Container w="50px"></Container>
          <Stack direction="column">
            <Heading>Your Vote Matters!</Heading>
            <Container maxW="600">
              <Image
                boxSize="350px"
                w="500"
                objectFit="cover"
                src="https://s7d2.scene7.com/is/image/TWCNews/istock-generic-election-buttons-votingjpg3840x2160jpg"
                alt="Voting Icon"
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in
            </Container>
          </Stack>
          <Stack direction="column">
            <Container maxW="2xl" centerContent>
              <Box
                padding="4"
                bg="gray.100"
                color="black"
                maxW="md"
                border="2px"
                borderColor="teal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Box>
            </Container>
            <Container maxW="2xl" centerContent>
              <Box
                padding="4"
                bg="gray.100"
                color="black"
                maxW="md"
                border="2px"
                borderColor="teal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Box>
            </Container>
            <Container maxW="2xl" centerContent>
              <Box
                padding="4"
                bg="gray.100"
                color="black"
                maxW="md"
                border="2px"
                borderColor="teal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Box>
            </Container>
          </Stack>
          <Container w="50px"></Container>
        </Stack>
      </Stack>
    </>
  );
}
