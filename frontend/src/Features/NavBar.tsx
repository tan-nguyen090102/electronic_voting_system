import {
  Flex,
  Heading,
  Spacer,
  Button,
  HStack,
  Image,
  Stack,
  Wrap,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface TopNavProps {
  title: string;
  isLoggedIn: string;
  isBlank: string;
  userName: string;
  role: string;
}

interface ListNavProps {
  indexClick: string;
}

interface ListNavVoterProps {
  indexClick: string;
  isLoggedIn: string;
}

interface ListNavManagerProps {
  indexClick: string;
  isLoggedIn: string;
}

//Top Navigation Bar
export default function NavBar(props: TopNavProps) {
  const isLoggedIn = props.isLoggedIn;
  const isBlank = props.isBlank;

  //Get today and time
  const [currentDay, setCurrentDay] = React.useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentDay(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

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
    navigate("/user_profile", {
      state: { user: props.userName, role: props.role },
    });
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
        <Link
          to={
            props.role === "voter"
              ? "/"
              : props.role === "admin"
              ? "/election"
              : "/dashboard_manager"
          }
          state={{ user: props.userName, isLoggedIn: isLoggedIn }}
        >
          <Image
            boxSize="50px"
            objectFit="cover"
            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3415254/election-day-clipart-md.png"
            alt="Voting Icon"
          />
        </Link>
        <HStack spacing="24px">
          <Spacer />
          <Heading>{props.title}</Heading>
        </HStack>
      </Flex>

      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "end" }}>
        <HStack spacing="24px">
          <Wrap>
            <Text fontSize="md">Today is {currentDay.toLocaleString()}</Text>
          </Wrap>
          <Button
            colorScheme="teal"
            onClick={isLoggedIn === "true" ? handleUserProfile : handleSignup}
            style={{ display: isBlank === "true" ? "none" : "block" }}
          >
            {isLoggedIn === "true" ? props.userName : "Sign up"}
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleLogin}
            style={{ display: isBlank === "true" ? "none" : "block" }}
          >
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
  const BALLOT_INDEX = "8";

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
        navigate("/requests", { state: { user: user } });
        break;
      case SEARCH_INDEX:
        navigate("/search", { state: { user: user } });
        break;
      case BALLOT_INDEX:
        navigate("/ballot_admin", { state: { user: user } });
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
          onClick={() => handleClick(BALLOT_INDEX)}
          isDisabled={props.indexClick === BALLOT_INDEX ? true : false}
        >
          BALLOTS
        </Button>
      </Stack>
    </div>
  );
}

//Voter List Navigation Bar
export function ListNavigationBarVoter(props: ListNavVoterProps) {
  const HOME_INDEX = "0";
  const BALLOT_INDEX = "1";
  const PRECINCT_INDEX = "2";
  const CANDIDATE_INDEX = "3";

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Button Listeners
  const navigate = useNavigate();
  const handleClick = (index: string) => {
    switch (index) {
      case HOME_INDEX:
        navigate("/", { state: { user: user, isLoggedIn: props.isLoggedIn } });
        break;
      case BALLOT_INDEX:
        navigate("/ballot_voter", { state: { user: user } });
        break;
      case PRECINCT_INDEX:
        navigate("/precinct_voter", { state: { user: user } });
        break;
      case CANDIDATE_INDEX:
        navigate("/candidate_voter", { state: { user: user } });
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
          onClick={() => handleClick(HOME_INDEX)}
          isDisabled={props.indexClick === HOME_INDEX ? true : false}
        >
          HOME
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(BALLOT_INDEX)}
          isDisabled={props.indexClick === BALLOT_INDEX ? true : false}
        >
          BALLOT
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(CANDIDATE_INDEX)}
          isDisabled={props.indexClick === CANDIDATE_INDEX ? true : false}
        >
          CANDIDATE
        </Button>
      </Stack>
    </div>
  );
}

//Manager List Navigation Bar
export function ListNavigationBarManager(props: ListNavManagerProps) {
  const HOME_INDEX = "0";
  const BALLOT_INDEX = "1";
  const PRECINCT_INDEX = "2";

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Button Listeners
  const navigate = useNavigate();
  const handleClick = (index: string) => {
    switch (index) {
      case HOME_INDEX:
        navigate("/", { state: { user: user, isLoggedIn: props.isLoggedIn } });
        break;
      case BALLOT_INDEX:
        navigate("/ballot_manager", { state: { user: user } });
        break;
      case PRECINCT_INDEX:
        navigate("/precinct_manager", { state: { user: user } });
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
          onClick={() => handleClick(HOME_INDEX)}
          isDisabled={props.indexClick === HOME_INDEX ? true : false}
        >
          HOME
        </Button>
        <Button
          bg="teal.400"
          height="40px"
          width="200px"
          borderRadius="0px"
          onClick={() => handleClick(BALLOT_INDEX)}
          isDisabled={props.indexClick === BALLOT_INDEX ? true : false}
        >
          BALLOT
        </Button>
      </Stack>
    </div>
  );
}
