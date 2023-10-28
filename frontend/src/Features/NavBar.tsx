import {
  Flex,
  Heading,
  Spacer,
  Button,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
  title: string;
  isLoggedIn: string;
  userName: string;
}

interface ListNavProps {
  indexClick: string;
}

//Top Navigation Bar
export default function NavBar(props: TopNavProps) {
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
          <Heading>{props.title}</Heading>
        </HStack>
      </Flex>

      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "end" }}>
        <HStack spacing="24px">
          <Button
            colorScheme="teal"
            onClick={isLoggedIn === "true" ? handleUserProfile : handleSignup}
          >
            {isLoggedIn ? props.userName : "Sign up"}
          </Button>
          <Button colorScheme="teal" onClick={handleLogin}>
            {isLoggedIn === "true" ? "Log out" : "Log in"}
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

//Administrator List Navigation Bar
export function ListNavigationBar(props: ListNavProps) {
  const ELECTION_INDEX = "0";
  const RACE_INDEX = "1";
  const PRECINCT_INDEX = "2";
  const CANDIDATE_INDEX = "3";
  const REQUEST_INDEX = "4";

  //Button Listeners
  const navigate = useNavigate();
  const handleClick = (index: string) => {
    switch (index) {
      case ELECTION_INDEX:
        navigate("/election");
        break;
      case RACE_INDEX:
        navigate("/race");
        break;
      case PRECINCT_INDEX:
        navigate("/precinct");
        break;
      case CANDIDATE_INDEX:
        navigate("/candidate");
        break;
      case REQUEST_INDEX:
        navigate("/request");
        break;
    }
  };

  //DOM
  return (
    <div>
      <Stack direction="row" bg="teal.400" spacing="0px">
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(ELECTION_INDEX)}
          isDisabled={props.indexClick === ELECTION_INDEX ? true : false}
        >
          ELECTION
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(RACE_INDEX)}
          isDisabled={props.indexClick === RACE_INDEX ? true : false}
        >
          ELECTORAL RACES
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(PRECINCT_INDEX)}
          isDisabled={props.indexClick === PRECINCT_INDEX ? true : false}
        >
          PRECINCTS
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(CANDIDATE_INDEX)}
          isDisabled={props.indexClick === CANDIDATE_INDEX ? true : false}
        >
          CANDIDATES
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(REQUEST_INDEX)}
          isDisabled={props.indexClick === REQUEST_INDEX ? true : false}
        >
          USER REQUESTS
        </Button>
      </Stack>
    </div>
  );
}
