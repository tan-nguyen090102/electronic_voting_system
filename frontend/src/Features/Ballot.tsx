import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  RadioGroup,
  Stack,
  Radio,
  Box,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBarVoter } from "./NavBar";
import React from "react";

interface AlertRaceProps {
  isOpen: any;
  onClose: any;
  race: any;
  index: number;
}

interface AlertVoteProps {
  isOpen: any;
  onClose: any;
  race: any;
  choice: any[];
  handleVote: any;
}

interface AlertSummaryProps {
  isOpen: any;
  onClose: any;
  race: any;
  index: number;
  choiceList: any[];
  isNoChoice: boolean;
}

interface ModalProps {
  user: any;
  precinct: any;
  isLaunched: boolean;
  isOpen: any;
  onClose: any;
  race: any;
  listofCandidates: any[];
  handleRefreshList: any;
  setNoChoice: any;
}

export default function BallotPage() {
  //Adding box
  const alertBox = useDisclosure();
  const alertSummaryBox = useDisclosure();
  const modalBox = useDisclosure();

  //Change web title
  useEffect(() => {
    document.title = "Ballot - Voting System";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  const [receivedPrecinct, setPrecinct] = React.useState<any>();
  const [receivedRaceList, setRaceList] = React.useState<Array<any>>([]);
  const [receivedCandidateList, setCandidateList] = React.useState<Array<any>>(
    []
  );
  const [receivedChoiceList, setChoiceList] = React.useState<Array<any>>([]);
  const [currentRace, setCurrentRace] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [isNothingMessage, setNothingMessage] = React.useState(false);
  const [isNoChoiceMessage, setNoChoiceMessage] = React.useState(false);

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
        if (data === "False") {
          setPrecinct("");
          setRaceList([]);
          setCandidateList([]);
          setChoiceList([]);
          handlePointer([], -1);
          setNothingMessage(true);
        } else {
          setPrecinct(data[0]);
          setRaceList(data[1]);
          setCandidateList(data[2]);
          setChoiceList(data[3]);
          handlePointer(data[1], 0);
          if (data[1].length === 0) {
            setNothingMessage(true);
          } else {
            setNothingMessage(false);
          }
          if (data[3] === "False") {
            setNoChoiceMessage(true);
          } else {
            setNoChoiceMessage(false);
          }
        }
      });
  }, [user]);

  //Pointer to current item
  const handlePointer = (race: any, index: number) => {
    setCurrentRace(race);
    setCurrentIndex(index);
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
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
        if (data === "False") {
          setPrecinct("");
          setRaceList([]);
          setCandidateList([]);
          setChoiceList([]);
          handlePointer([], -1);
          setNothingMessage(true);
        } else {
          setPrecinct(data[0]);
          setRaceList(data[1]);
          setCandidateList(data[2]);
          setChoiceList(data[3]);
          handlePointer(data[1], 0);
          if (data[1].length === 0) {
            setNothingMessage(true);
          } else {
            setNothingMessage(false);
          }
        }
      });
  };

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
          <CreateModalBox
            user={user}
            precinct={receivedPrecinct}
            isOpen={modalBox.isOpen}
            onClose={modalBox.onClose}
            isLaunched={modalBox.isOpen}
            race={currentRace}
            listofCandidates={receivedCandidateList[currentIndex]}
            handleRefreshList={handleRefreshList}
            setNoChoice={setNoChoiceMessage}
          ></CreateModalBox>
          <Button
            bg="green.400"
            mt={6}
            onClick={() => {
              alertSummaryBox.onOpen();
            }}
          >
            Summary
          </Button>
          <CreateAlertSummaryBox
            isOpen={alertSummaryBox.isOpen}
            onClose={alertSummaryBox.onClose}
            race={currentRace}
            index={currentIndex}
            choiceList={receivedChoiceList}
            isNoChoice={isNoChoiceMessage}
          ></CreateAlertSummaryBox>
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
      let isDisable = false;

      //Find the race in the choice list
      try {
        receivedChoiceList.forEach((choice) => {
          if (choice[1] === race[0]) {
            isDisable = true;
            throw new Error("Break");
          } else {
            isDisable = false;
          }
        });
      } catch (error) {}

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
                (race[6] === "inactive") !== isDisable
                  ? alertBox.onOpen()
                  : modalBox.onOpen();
              }}
            >
              {(race[6] === "inactive") !== isDisable ? "View" : "Vote"}
            </Button>
            <CreateAlertRaceBox
              isOpen={alertBox.isOpen}
              onClose={alertBox.onClose}
              race={currentRace}
              index={currentIndex}
            ></CreateAlertRaceBox>
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
        return (
          <ListItem key={index}>
            {candidate.length === 0
              ? "There is no candidate for this race."
              : candidate[1] + " " + candidate[2]}
          </ListItem>
        );
      });

    return candidateDetails;
  }
}

//Alert box for race
export function CreateAlertRaceBox(props: AlertRaceProps) {
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

//Alert box for summary
export function CreateAlertSummaryBox(props: AlertSummaryProps) {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      size="3x1"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Summary of your ballot
          </AlertDialogHeader>
          <AlertDialogBody>
            <List marginRight="auto" mt={3}>
              {CreateSummaryList(props.choiceList)}
            </List>
            {props.isNoChoice && (
              <Text data-testid="unfilledFields" mb={3} fontSize="2xl">
                You have not selected any candidate for any electoral race.
              </Text>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose} ml={3} bg="red.400">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  function CreateSummaryList(listToShown: any[]) {
    const summaryDetails =
      Array.isArray(listToShown) &&
      listToShown.map((choice, index) => {
        return (
          <ListItem key={index}>
            <Box
              border="2px"
              borderRadius="5px"
              alignItems="baseline"
              mb={1}
              w="100%"
            >
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="space-between"
              >
                <Text ml={3} fontSize="lg">
                  {choice[7]}
                </Text>
                <Text ml={3} mr={3} fontSize="lg">
                  {choice[5] + " " + choice[6]}
                </Text>
              </Stack>
            </Box>
          </ListItem>
        );
      });

    return summaryDetails;
  }
}

//Modal box for voting
export function CreateModalBox(props: ModalProps) {
  //Toast
  const addToast = useToast();

  //Alert box
  const alertVoteBox = useDisclosure();

  //Choice listener
  const [radioValue, setRadioValue] = React.useState("");
  const [candidateChoice, setCadidateChoice] = React.useState("");
  const handleVote = async () => {
    //Fetch the backend to send the data
    await fetch(`http://localhost:5000/voters/ballot_voter/vote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        email: props.user,
        raceID: props.race[0],
        precinctID: props.precinct[0],
        candidateID: radioValue,
      }),
    });

    //Call from the top DOM
    props.onClose();
    props.handleRefreshList();
    props.setNoChoice(false);

    //Adding toast
    addToast({
      title: "You have voted!",
      description: `You have choose ${candidateChoice} for the next official of ${props.race[2]}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  //Box DOM
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>Vote For {props.race[2]}</ModalHeader>
        <ModalBody>
          <RadioGroup>
            <Stack direction="column">
              {CreateRadioList(props.listofCandidates)}
            </Stack>
          </RadioGroup>
          <ModalFooter>
            <Button
              data-testid="voteButton"
              colorScheme="teal"
              onClick={
                radioValue === ""
                  ? () =>
                      addToast({
                        title: "You have not chosen yet!",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                      })
                  : () => alertVoteBox.onOpen()
              }
            >
              Vote
            </Button>
            <Button
              data-testid="cancelButton"
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                setRadioValue("");
                setCadidateChoice("");
                props.onClose();
              }}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
          <CreateAlertVoteBox
            isOpen={alertVoteBox.isOpen}
            onClose={alertVoteBox.onClose}
            race={props.race}
            choice={[radioValue, candidateChoice]}
            handleVote={handleVote}
          ></CreateAlertVoteBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  function CreateRadioList(listToShown: any[]) {
    const candidateDetails =
      Array.isArray(listToShown) &&
      listToShown.map((candidate, index) => {
        return (
          <Radio
            key={index}
            value={candidate[3]}
            colorScheme="green"
            onChange={() => {
              setRadioValue(candidate[3]);
              setCadidateChoice(candidate[1] + " " + candidate[2]);
            }}
          >
            {candidate[1] + " " + candidate[2]}
          </Radio>
        );
      });

    return candidateDetails;
  }
}

//Alert box for deleting precinct
export function CreateAlertVoteBox(props: AlertVoteProps) {
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
            Are you sure about this choice?
          </AlertDialogHeader>
          <AlertDialogBody>
            <List marginRight="auto" mt={3}>
              <ListItem>
                Title: <b>{props.race[2]}</b>
              </ListItem>
              <ListItem>
                Candidate: <b>{props.choice[1]}</b>
              </ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleVote(props.choice[0]);
                props.onClose();
              }}
            >
              Vote
            </Button>
            <Button ref={cancelRef} onClick={props.onClose} ml={3}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
