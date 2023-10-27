import { Flex, Heading, Spacer, Button, HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

export default function NavBar(props: Props) {
  const isLoggedIn = props.isLoggedIn;

  //Login/out button listener
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  //Sign up button listener
  const handleSignup = () => {
    navigate("/signup");
  };

  //User profile listener
  const handleUserProfile = () => {
    navigate("/user_profile");
  };

  //DOM
  return (
    <Flex
      minH={"60px"}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={3}
      borderStyle={"solid"}
      borderColor={"teal"}
      background="gray.100"
      p={4}
      align={"center"}
    >
      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <Image
          boxSize="50px"
          objectFit="cover"
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3415254/election-day-clipart-md.png"
          alt="Voting Icon"
        />
        <HStack spacing="24px">
          <Spacer />
          <Heading>My Vote</Heading>
        </HStack>
      </Flex>

      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "end" }}>
        <HStack spacing="24px">
          <Button colorScheme="teal" onClick={handleLogin}>
            {isLoggedIn ? "Log out" : "Log in"}
          </Button>
          <Button
            colorScheme="teal"
            onClick={isLoggedIn ? handleUserProfile : handleSignup}
          >
            {isLoggedIn ? "User Profile" : "Sign up"}
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
