import {
  Flex,
  Heading,
  Spacer,
  Button,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

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
            {isLoggedIn === "true" ? props.userName : "Sign up"}
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
  const DISTRICT_INDEX = "2";
  const PRECINCT_INDEX = "3";
  const CANDIDATE_INDEX = "4";
  const SEARCH_INDEX = "5";
  const REQUEST_INDEX = "6";
  const MANAGER_INDEX = "7";

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Button Listeners
  const navigate = useNavigate();
  const handleClick = (index: string) => {
    switch (index) {
      case ELECTION_INDEX:
        navigate("/election", { state: { user: user } });
        break;
      case RACE_INDEX:
        navigate("/race", { state: { user: user } });
        break;
      case DISTRICT_INDEX:
        navigate("/district", { state: { user: user } });
        break;
      case PRECINCT_INDEX:
        navigate("/precinct", { state: { user: user } });
        break;
      case CANDIDATE_INDEX:
        navigate("/candidate", { state: { user: user } });
        break;
      case REQUEST_INDEX:
        navigate("/request", { state: { user: user } });
        break;
      case SEARCH_INDEX:
        navigate("/search", { state: { user: user } });
        break;
      case MANAGER_INDEX:
        navigate("/manager-list", { state: { user: user } });
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
          onClick={() => handleClick(DISTRICT_INDEX)}
          isDisabled={props.indexClick === DISTRICT_INDEX ? true : false}
        >
          DISTRICT
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
          onClick={() => handleClick(SEARCH_INDEX)}
          isDisabled={props.indexClick === SEARCH_INDEX ? true : false}
        >
          USER SEARCH
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
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(MANAGER_INDEX)}
          isDisabled={props.indexClick === MANAGER_INDEX ? true : false}
        >
          MANAGERS
        </Button>
      </Stack>
    </div>
  );
}
