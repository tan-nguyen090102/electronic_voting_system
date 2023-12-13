import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Heading,
  Spacer,
  Image,
  Container,
  Box,
  Stack,
  Center,
<<<<<<< HEAD
=======
  AbsoluteCenter,
>>>>>>> d9b73d4 (basic two step verification page (not functional at the moment))
} from "@chakra-ui/react";
import NavBar, { ListNavigationBarVoter } from "./NavBar";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - Voting System";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user, isLoggedIn } = state || { user: "", isLoggedIn: "false" };

  return (
    <>
      <NavBar
        title={
          isLoggedIn === "true"
            ? "Welcome, " + user
            : "Electronic Voting System"
        }
        isLoggedIn={isLoggedIn}
        isBlank="false"
        userName={user}
        role="voter"
      />
      {isLoggedIn && user !== "" && (
        <ListNavigationBarVoter
          indexClick="0"
          isLoggedIn={isLoggedIn}
        ></ListNavigationBarVoter>
      )}
      <Stack direction="column">
        <Spacer />
        <Box
          padding="4"
          bg="teal.400"
          color="white"
          w="100%"
          w="100%"
          border="2px"
          borderColor="teal"
        >
          <Center>
<<<<<<< HEAD
            RIGHT NOW: Candidate A vs Candidate B in Random Location's
            Presidental Race
=======
          RIGHT NOW: Candidate A vs Candidate B in Random Location's Presidental
          Race
>>>>>>> d9b73d4 (basic two step verification page (not functional at the moment))
          </Center>
        </Box>
        <Stack direction="row" w="100%">
        <Stack direction="row" w="100%">
          <Container w="50px"></Container>
          <Stack direction="column">
            <Container maxW="600">
<<<<<<< HEAD
              <Center>
                <Heading>Your Vote Matters!</Heading>
              </Center>
=======
            <Center>
            <Heading>Your Vote Matters!</Heading>
            </Center>
>>>>>>> d9b73d4 (basic two step verification page (not functional at the moment))
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
<<<<<<< HEAD
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
=======
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
>>>>>>> d9b73d4 (basic two step verification page (not functional at the moment))
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
