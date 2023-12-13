import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Heading,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  ListItem,
  List,
  AlertDialog,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Wrap,
  Text,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBarVoter } from "./NavBar";
import React from "react";

interface AlertProps {
  isOpen: any;
  onClose: any;
  race: any;
  index: number;
}

export default function BallotPage() {
  //Adding box
  const alertBox = useDisclosure();

  //Change web title
  useEffect(() => {
    document.title = "Ballot - Voting System";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };
  const { candidate } = state || { candidate: "" }

  const [receivedPrecinct, setPrecinct] = React.useState<any>();
  const [receivedRaceList, setRaceList] = React.useState<Array<any>>([]);
  const [receivedCandidateList, setCandidateList] = React.useState<Array<any>>(
    []
  );
  const [currentRace, setCurrentRace] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [isNothingMessage, setNothingMessage] = React.useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/voters/ballot_voter`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        email: user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "False") {
          setPrecinct("");
          setRaceList([]);
          setCandidateList([]);
          handlePointer([], -1);
          setNothingMessage(true);
        } else {
          setPrecinct(data[0]);
          setRaceList(data[1]);
          setCandidateList(data[2]);
          handlePointer(data[1], 0);
          if (data[1].length === 0) {
            setNothingMessage(true);
          } else {
            setNothingMessage(false);
          }
        }
      });
  }, []);

  //Pointer to current item
  const handlePointer = (race: any, index: number) => {
    setCurrentRace(race);
    setCurrentIndex(index);
  };

  //Vote button listeners
  const handleVote = () => {};

  //DOM
  return (
    <div>
      <NavBar
        title={"My Ballot"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="voter"
      ></NavBar>
      <ListNavigationBarVoter
        indexClick="1"
        isLoggedIn="true"
      ></ListNavigationBarVoter>
      <Flex
        height="auto"
        width="auto"
        alignItems="left"
        justifyContent="center"
      >
        <Flex
          width="1200px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <Heading mb={6}>Your Precinct: {receivedPrecinct}</Heading>
          <Wrap>
            {isNothingMessage && (
              <Text data-testid="unfilledFields" mb={3} fontSize="2xl">
                There is no registered ballot for this precinct currently.
              </Text>
            )}
          </Wrap>
          <SimpleGrid
            width="1000px"
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {CreateRaceCards(receivedRaceList)}
          </SimpleGrid>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create electoral race cards
  function CreateRaceCards(listToShown: any[]) {
    const raceList = listToShown.map((race, index) => {
      return (
        <Card key={index} direction="column">
          <CardHeader height="60px">
            <Heading size="md">{race[2]}</Heading>
          </CardHeader>
          <CardBody style={{ position: "relative" }}>
            <List key={index}>
              {CreateCandidateList(receivedCandidateList[index])}
            </List>
          </CardBody>
          <CardFooter>
            <Button
              bg="teal.400"
              onClick={() => {
                handlePointer(race, index);
                race[6] === "inactive" ? alertBox.onOpen() : handleVote();
              }}
            >
              {race[6] === "inactive" ? "View" : "Vote"}
            </Button>
            <CreateAlertBox
              isOpen={alertBox.isOpen}
              onClose={alertBox.onClose}
              race={currentRace}
              index={currentIndex}
            ></CreateAlertBox>
          </CardFooter>
        </Card>
      );
    });
    return raceList;
  }

  function CreateCandidateList(listToShown: any[]) {
    const candidateDetails =
      Array.isArray(listToShown) &&
      listToShown.map((candidate, index) => {
        console.log(candidate)
        return (
          <ListItem key={index}>
        <Link
          to={
            "/candidate_voter" }
          state={{ user: user, candidate: candidate[3] }}
          style={{ color: '#008080' }}
        >
            {candidate.length === 0
              ? "There is nothing"
              : candidate[1] + " " + candidate[2]}
            </Link>
          </ListItem>
        );
      });

    return candidateDetails;
  }
}

//Alert box for deleting precinct
export function CreateAlertBox(props: AlertProps) {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.race[2]}
          </AlertDialogHeader>
          <AlertDialogBody>
            <List marginRight="auto" mt={3}>
              <ListItem>Race ID: {props.race[0]}</ListItem>
              <ListItem>Type of race: {props.race[3]}</ListItem>
              <ListItem>Number of candidates: {props.race[7]}</ListItem>
              <ListItem>Term: {props.race[4]}</ListItem>
              <ListItem>Part of Election: {props.race[5]}</ListItem>
              <ListItem>Status: {props.race[6]}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose} ml={3}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
