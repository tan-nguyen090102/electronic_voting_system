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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBarManager } from "./NavBar";
import React from "react";

interface AlertRaceProps {
  isOpen: any;
  onClose: any;
  race: any;
  index: number;
}

interface ModalProps {
  user: any;
  precinct: any;
  isLaunched: boolean;
  isOpen: any;
  onClose: any;
  race: any;
  handleRefreshList: any;
}

export default function BallotManagerPage() {
  //Adding box
  const alertBox = useDisclosure();
  const modalBox = useDisclosure();

  //Change web title
  useEffect(() => {
    document.title = "Ballot - Voting System Manager";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  const [receivedPrecinct, setPrecinct] = React.useState<any>();
  const [receivedRaceList, setRaceList] = React.useState<Array<any>>([]);
  const [currentRace, setCurrentRace] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [isNothingMessage, setNothingMessage] = React.useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/managers/ballot_manager`, {
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
          handlePointer([], -1);
          setNothingMessage(true);
        } else {
          setPrecinct(Array.isArray(data[0]) ? data[0][0] : "");
          setRaceList(data[1]);
          handlePointer(data[1], 0);
          if (Array.isArray(data[1]) && data[1].length === 0) {
            setNothingMessage(true);
          } else {
            setNothingMessage(false);
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
    fetch(`http://localhost:5000/managers/ballot_manager`, {
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
          handlePointer([], -1);
          setNothingMessage(true);
        } else {
          setPrecinct(Array.isArray(data[0]) ? data[0][0] : "");
          setRaceList(data[1]);
          handlePointer(data[1], 0);
          if (Array.isArray(data[1]) && data[1].length === 0) {
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
      <ListNavigationBarManager
        indexClick="1"
        isLoggedIn="true"
      ></ListNavigationBarManager>
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
            race={Array.isArray(currentRace) ? currentRace : []}
            handleRefreshList={handleRefreshList}
          ></CreateModalBox>
          <Button
            data-testid="activateButton"
            bg="teal.400"
            mt={6}
            onClick={() => {
              modalBox.onOpen();
            }}
          >
            Activate
          </Button>
          <CreateAlertRaceBox
            isOpen={alertBox.isOpen}
            onClose={alertBox.onClose}
            race={Array.isArray(currentRace) ? currentRace : []}
            index={currentIndex}
          ></CreateAlertRaceBox>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create electoral race cards
  function CreateRaceCards(listToShown: any[]) {
    const raceList =
      Array.isArray(listToShown) &&
      listToShown.map((race, index) => {
        return (
          <Card key={index} direction="column">
            <CardHeader height="60px">
              <Heading size="md">{race[2]}</Heading>
            </CardHeader>
            <CardBody style={{ position: "relative" }}></CardBody>
            <CardFooter>
              <Button
                bg="teal.400"
                onClick={() => {
                  handlePointer(race, index);
                  alertBox.onOpen();
                }}
              >
                View
              </Button>
            </CardFooter>
          </Card>
        );
      });
    return raceList;
  }
}

//Alert box for deleting race
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

//Modal box for voting
export function CreateModalBox(props: ModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    electionID: "",
  };

  const [receivedElectionList, setReceiveElectionList] = React.useState<
    Array<any>
  >([]);
  const [electionListOnScreen, setElectionListOnScreen] = React.useState<
    Array<any>
  >([]);
  useEffect(() => {
    if (props.isLaunched) {
      fetch("http://localhost:5000/election")
        .then((response) => response.json())
        .then((data) => {
          setReceiveElectionList(data);
          setElectionListOnScreen(data);
        });
    }
  }, [props.isLaunched]);

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listElectionJSX, setListElectionJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "electionID") {
      CreateElectionListOnScreen(value, electionListOnScreen);
    }
  };

  //Show the value on input field after click on item
  const handlePointer = (field: string, value: string) => {
    setInputValue({
      ...inputValue,
      [field]: value,
    });

    CreateElectionListOnScreen("", []);
    setElectionListOnScreen(receivedElectionList);
  };

  //Activate listeners
  const handleActivate = async () => {
    //Fetch the backend to send the data
    await fetch(`http://localhost:5000/ballot_manager/activate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        electionID: inputValue.electionID,
      }),
    });

    //Call from the top DOM
    props.handleRefreshList();
    props.onClose();

    //Adding toast
    addToast({
      title: "Ballots Activated",
      description: `The ballots has been activated for the election ${props.race[5]}.`,
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
        <ModalHeader>Activate the ballot</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Election:</FormLabel>
            <Input
              name="electionID"
              data-testid="electionID"
              onChange={handleInput}
              value={inputValue.electionID}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          {listElectionJSX}
          <ModalFooter>
            <Button
              data-testid="activationButton"
              colorScheme="teal"
              onClick={() => {
                handleActivate();
              }}
            >
              Activate
            </Button>
            <Button
              data-testid="cancelButton"
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                props.onClose();
              }}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  function CreateElectionListOnScreen(currentInput: string, list: any[]) {
    setElectionListOnScreen(list);
    setListElectionJSX(CreateListOfElection(currentInput, list));
  }

  function CreateListOfElection(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheElection(listToShown, character)}</Wrap>;
  }

  function ListTheElection(listofElection: any[], filterChar: string) {
    var electionList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofElection)) {
      electionList = listofElection.map((election, index) => {
        if (election[0].includes(filterChar)) {
          return (
            <Button
              key={election[0]}
              onClick={() => {
                handlePointer("electionID", election[0]);
              }}
            >
              {election[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      electionList = [];
    }

    return electionList;
  }
}
