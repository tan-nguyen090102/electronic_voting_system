import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Stack,
  Button,
  Wrap,
  Text,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

interface AlertProps {
  isOpen: any;
  onClose: any;
  handleDelete: any;
  race: any;
  index: number;
}

interface AddModalProps {
  isLaunched: any;
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

interface AddCandidateProps {
  isLaunched: any;
  isOpen: any;
  onClose: any;
  race: any;
  index: string;
  handleRefreshList: any;
}

export default function RacePanel() {
  //Adding box
  const addModalBox = useDisclosure();
  const addCandidateBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_RACE_SHOWN = 50;

  //Change web title
  useEffect(() => {
    document.title = "Electoral Races - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedRaceList, setRaceList] = React.useState<Array<any>>([]);
  const [copyRacelist, setCopyRaceList] = React.useState<Array<any>>([]);
  const [currentRace, setCurrentRace] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  useEffect(() => {
    fetch("http://localhost:5000/race")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setRaceList([]);
          setCopyRaceList([]);
          handlePointer([], -1);
        } else {
          if (Array.isArray(data)) {
            setRaceList(data);
            setCopyRaceList(data);
            handlePointer(data[0], 0);
          } else {
            setRaceList([]);
            setCopyRaceList([]);
            handlePointer([], -1);
          }
        }
      });
  }, []);

  //Selection listener
  const [inputSelection, setInputSelection] = React.useState("ALL");
  const handleSelection = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputSelection(e.target.value);
  };

  //Filter button listener
  const [isNoMatchPopUp, setNoMatchPopUp] = React.useState(false);
  const handleFilter = () => {
    if (inputSelection !== "ALL") {
      //Filter the state by selection
      const filteredRace = copyRacelist?.map((race) => {
        if (race[5].split("-")[0] === inputSelection) {
          return race;
        } else {
          return [];
        }
      });
      for (let i = 0; i < filteredRace.length; i++) {
        if (filteredRace[i].length !== 0) {
          setNoMatchPopUp(false);
          break;
        } else {
          setNoMatchPopUp(true);
        }
      }

      setRaceList(filteredRace);
    } else {
      setRaceList(copyRacelist);
      setNoMatchPopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (race: any, index: number) => {
    setCurrentRace(race);
    setCurrentIndex(index);
  };

  //Delete button listener
  const handleDelete = async (race: any, index: number) => {
    await fetch("http://localhost:5000/race", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        raceID: race[0],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "Electoral Race Deleted!",
      description: `The electoral race ${race[0]} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/race")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setRaceList([]);
          setCopyRaceList([]);
        } else {
          setRaceList(data);
          setCopyRaceList(data);
        }
      });
  };

  //Container for state options
  const stateOptions = (
    <>
      <option value="ALL">All</option>
      <option value="US">US</option>
      <option value="AL">AL</option>
      <option value="AK">AK</option>
      <option value="AZ">AZ</option>
      <option value="AR">AR</option>
      <option value="CA">CA</option>
      <option value="CO">CO</option>
      <option value="CT">CT</option>
      <option value="DE">DE</option>
      <option value="FL">FL</option>
      <option value="GA">GA</option>
      <option value="HI">HI</option>
      <option value="ID">ID</option>
      <option value="IL">IL</option>
      <option value="IN">IN</option>
      <option value="IA">IA</option>
      <option value="KS">KS</option>
      <option value="KY">KY</option>
      <option value="LA">LA</option>
      <option value="ME">ME</option>
      <option value="MD">MD</option>
      <option value="MA">MA</option>
      <option value="MI">MI</option>
      <option value="MN">MN</option>
      <option value="MS">MS</option>
      <option value="MO">MO</option>
      <option value="MT">MT</option>
      <option value="NE">NE</option>
      <option value="NV">NV</option>
      <option value="NH">NH</option>
      <option value="NJ">NJ</option>
      <option value="NM">NM</option>
      <option value="NY">NY</option>
      <option value="NC">NC</option>
      <option value="ND">ND</option>
      <option value="OH">OH</option>
      <option value="OK">OK</option>
      <option value="OR">OR</option>
      <option value="PA">PA</option>
      <option value="RI">RI</option>
      <option value="SC">SC</option>
      <option value="SD">SD</option>
      <option value="TN">TN</option>
      <option value="TX">TX</option>
      <option value="UT">UT</option>
      <option value="VT">VT</option>
      <option value="VA">VA</option>
      <option value="WA">WA</option>
      <option value="WV">WV</option>
      <option value="WI">WI</option>
      <option value="WY">WY</option>
    </>
  );

  //DOM
  return (
    <div>
      <NavBar
        title={"Electoral Races"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="admin"
      ></NavBar>
      <ListNavigationBar indexClick="1"></ListNavigationBar>
      <Flex height="auto" alignItems="left" justifyContent="center">
        <Flex
          width="1000px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <Wrap justify="center">
            <Stack direction="column">
              <Stack direction="row">
                <Text fontSize="md" mt={0}>
                  Current registered races: {receivedRaceList?.length}
                </Text>
              </Stack>
              <Stack direction="row" mb={3} align="baseline">
                <Text fontSize="md" mt={0} mb={3}>
                  Filter by state:
                </Text>
                <Select
                  name="state"
                  data-testid="state"
                  width={24}
                  borderWidth={2}
                  onChange={handleSelection}
                >
                  {stateOptions}
                </Select>
                <Button
                  data-testid="filterButton"
                  colorScheme="teal"
                  mt={3}
                  onClick={handleFilter}
                >
                  Filter
                </Button>
              </Stack>
            </Stack>
          </Wrap>
          <Accordion allowToggle>
            {CreateAccordionItem(receivedRaceList)}
          </Accordion>
          {isNoMatchPopUp && (
            <Text data-testid="invalidInput" mb={3}>
              There is no race that matched the filtered state.
            </Text>
          )}
          <CreateAddModalBox
            isOpen={addModalBox.isOpen}
            onClose={addModalBox.onClose}
            handleRefreshList={handleRefreshList}
            isLaunched={addModalBox.isOpen}
          ></CreateAddModalBox>
          <CreateAddCandidateBox
            isOpen={addCandidateBox.isOpen}
            onClose={addCandidateBox.onClose}
            isLaunched={addCandidateBox.isOpen}
            race={currentRace}
            index={currentIndex.toString()}
            handleRefreshList={handleRefreshList}
          ></CreateAddCandidateBox>
          <Button
            data-testid="addButton"
            colorScheme="teal"
            mt={3}
            onClick={addModalBox.onOpen}
            alignSelf="left"
          >
            Add
          </Button>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create each accordion box
  function CreateAccordionItem(jsonList: any[]) {
    const raceDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_RACE_SHOWN).map((race, index) => {
        if (race.length === 0) {
          return <div key={index}></div>;
        } else {
          return (
            <AccordionItem
              id={index.toString()}
              data-testid="accordion"
              width="container.md"
              key={index}
            >
              <h2>
                <AccordionButton
                  onClick={() => {
                    handlePointer(race, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    Race #{race[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Title: {race[2]}</ListItem>
                    <ListItem>Type: {race[1]}</ListItem>
                    <ListItem>Term of Services: {race[3]}</ListItem>
                    <ListItem>Number of Candidates: {race[4]}</ListItem>
                    <ListItem>District: {race[5]}</ListItem>
                    <ListItem>Election: {race[6]}</ListItem>
                  </List>
                  <Button
                    data-testid="addCandidateButton"
                    colorScheme="teal"
                    onClick={addCandidateBox.onOpen}
                  >
                    View/Add Candidate
                  </Button>
                  <Button
                    data-testid="deleteButton"
                    bg="red.400"
                    onClick={() => {
                      alertBox.onOpen();
                    }}
                  >
                    Delete
                  </Button>
                  <CreateAlertBox
                    isOpen={alertBox.isOpen}
                    onClose={alertBox.onClose}
                    handleDelete={handleDelete}
                    race={currentRace}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return raceDetails;
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
            Delete Electoral Race
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this electoral race from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>Race ID: {props.race[0]}</ListItem>
              <ListItem>Title: {props.race[2]}</ListItem>
              <ListItem>Type: {props.race[1]}</ListItem>
              <ListItem>Number of Candidates: {props.race[3]}</ListItem>
              <ListItem>District: {props.race[4]}</ListItem>
              <ListItem>Election: {props.race[5]}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.race, props.index);
                props.onClose();
              }}
            >
              Delete
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

//Modal box for adding candidate
export function CreateAddCandidateBox(props: AddCandidateProps) {
  //Toast
  const addToast = useToast();

  const [receivedListCandidate, setListOfCandidate] = React.useState<
    Array<any>
  >([]);
  const [isNoCandidate, setNoCandidate] = React.useState(false);
  useEffect(() => {
    if (props.isLaunched) {
      fetch("http://localhost:5000/race/view_candidate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          raceID: props.race[0],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === "False") {
            setListOfCandidate([]);
            setNoCandidate(true);
          } else {
            setListOfCandidate(data);
            setNoCandidate(false);
          }
        });
    }
  }, [props.isLaunched, props.race]);

  const initialValues = {
    candidateID: "",
  };

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [isAddPopUp, setAddPopUp] = React.useState(false);
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "candidateID") {
      if (value === "") {
        setAddPopUp(false);
      } else {
        setAddPopUp(true);
      }
    } else {
      setAddPopUp(false);
    }
  };

  //Add button listener
  const [isNotFoundPopUp, setNotFoundPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (inputValue.candidateID) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      await fetch(`http://localhost:5000/race/add_candidate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          candidateID: inputValue.candidateID,
          raceID: props.race[0],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "true") {
            setNotFoundPopUp(false);
            setNoCandidate(false);
            setAddPopUp(false);
            handleRefreshList();
            setInputValue({ candidateID: "" });

            //Adding toast
            addToast({
              title: "Candidate Added!",
              description: `The candidate ${inputValue.candidateID} is ready for this race.`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            setNotFoundPopUp(true);
            handleRefreshList();
            return;
          }
        });
    }
  };

  //Delete button listeners
  const handleDelete = async (candidate: any, index: number) => {
    await fetch(`http://localhost:5000/race/delete_candidate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        officialID: candidate[0],
        raceID: candidate[3],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "Electoral race official Deleted!",
      description: `The electoral official ${
        candidate[1] + " " + candidate[2]
      } is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRefreshList = () => {
    fetch("http://localhost:5000/race/view_candidate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        raceID: props.race[0],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setListOfCandidate([]);
          setNoCandidate(true);
          props.handleRefreshList();
        } else {
          setListOfCandidate(data);
          setNoCandidate(false);
          props.handleRefreshList();
        }
      });
  };

  return (
    <Modal
      id={props.index}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Stack direction="column">
            <b>List of candidate for the race:</b>
            <b>{props.race[0]}</b>
          </Stack>
        </ModalHeader>
        <ModalBody alignContent="left">
          <List marginRight="auto" mt={3}></List>
          <Stack direction="column" align="left">
            <List>{ListCandidates(receivedListCandidate as any[])}</List>
            {isNoCandidate && (
              <Text data-testid="unfilledFields" mb={3}>
                There is no candidate that registers to run this electoral race.
              </Text>
            )}
            <Stack direction="row" align="baseline">
              <b>Add:</b>
              <Input
                name="candidateID"
                data-testid="candidateID"
                onChange={handleInput}
                value={inputValue.candidateID}
                variant="filled"
                background="gray.200"
              ></Input>
            </Stack>
            {isNotFoundPopUp && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *There is no candidate with this ID in the system*
              </Text>
            )}
          </Stack>
          <ModalFooter>
            <Stack direction="row">
              <Button
                data-testid="addAddButton"
                colorScheme="teal"
                onClick={handleAdd}
                style={{ display: isAddPopUp ? "block" : "none" }}
              >
                Add
              </Button>
              <Button
                data-testid="cancelButton"
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  props.onClose();
                  setNotFoundPopUp(false);
                }}
                ml={3}
              >
                {isAddPopUp ? "Cancel" : "Close"}
              </Button>
            </Stack>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  //Helper function to show the list of candidate
  function ListCandidates(listofCandidate: any[]) {
    var candidateList: any[] = [];
    candidateList = listofCandidate.map((candidate, index) => {
      return (
        <ListItem key={index}>
          <Box border="1px" borderRadius="10px" alignItems="baseline">
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Text ml={3}>{candidate[1] + " " + candidate[2]}</Text>
              <Button
                flexDirection="row"
                bg="red.400"
                onClick={() => {
                  handleDelete(candidate, index);
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </ListItem>
      );
    });

    return candidateList;
  }
}

//Modal box for adding race
export function CreateAddModalBox(props: AddModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    title: "",
    type: "",
    numberCandidates: "",
    term: "",
    districtID: "",
    electionID: "",
  };

  //Backend fetch the list of available zip
  const [receivedDistrictList, setReceiveDistrictList] = React.useState<
    Array<any>
  >([]);
  const [receivedElectionList, setReceiveElectionList] = React.useState<
    Array<any>
  >([]);
  const [receivedTypeList, setReceiveTypeList] = React.useState<Array<any>>([]);
  const [typeListOnScreen, setTypeListOnScreen] = React.useState<Array<any>>(
    []
  );
  const [districtListOnScreen, setDistrictListOnScreen] = React.useState<
    Array<any>
  >([]);
  const [electionListOnScreen, setElectionListOnScreen] = React.useState<
    Array<any>
  >([]);

  useEffect(() => {
    if (props.isLaunched) {
      fetch("http://localhost:5000/race/add")
        .then((response) => response.json())
        .then((data) => {
          var typeList: any;
          var electionList: any;
          var districtList: any;
          if (Array.isArray(data)) {
            typeList = data.pop();
            electionList = data.pop();
            districtList = data.pop();
          }
          setReceiveTypeList(typeList);
          setTypeListOnScreen(typeList);
          setReceiveElectionList(electionList);
          setElectionListOnScreen(electionList);
          setReceiveDistrictList(districtList);
          setDistrictListOnScreen(districtList);
        });
    }
  }, [props.isLaunched]);

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listDistrictJSX, setListDistrictJSX] = React.useState<JSX.Element>();
  const [listTypeJSX, setListTypeJSX] = React.useState<JSX.Element>();
  const [listElectionJSX, setListElectionJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "districtID") {
      CreateDistrictListOnScreen(value, districtListOnScreen);
    }

    if (name === "type") {
      CreateTypeListOnScreen(value, typeListOnScreen);
    }

    if (name === "electionID") {
      CreateElectionListOnScreen(value, electionListOnScreen);
    }
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (
      inputValue.title &&
      inputValue.type &&
      inputValue.term &&
      inputValue.districtID &&
      inputValue.electionID
    ) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/race/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          title: inputValue.title,
          type: inputValue.type,
          numberCandidates: 0,
          term: inputValue.term,
          districtID: inputValue.districtID,
          electionID: inputValue.electionID,
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "Electoral Race Added!",
        description: `The electoral race ${inputValue.title} is ready to be deployed.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPopUp(true);
    }
  };

  //Show the value on input field after click on item
  const handlePointer = (field: string, value: string) => {
    setInputValue({
      ...inputValue,
      [field]: value,
    });

    CreateDistrictListOnScreen("", []);
    CreateTypeListOnScreen("", []);
    CreateElectionListOnScreen("", []);
    setDistrictListOnScreen(receivedDistrictList);
    setTypeListOnScreen(receivedTypeList);
    setElectionListOnScreen(receivedElectionList);
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
        <ModalHeader>Add new electoral race</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input
              name="title"
              data-testid="title"
              onChange={handleInput}
              value={inputValue.title}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Type of Race:</FormLabel>
            <Input
              name="type"
              data-testid="type"
              onChange={handleInput}
              value={inputValue.type}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          {listTypeJSX}
          <FormControl>
            <FormLabel>Term of Services:</FormLabel>
            <Input
              name="term"
              data-testid="term"
              onChange={handleInput}
              value={inputValue.term}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>District Representing:</FormLabel>
            <Input
              name="districtID"
              data-testid="districtID"
              onChange={handleInput}
              value={inputValue.districtID}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          {listDistrictJSX}
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
              data-testid="addAddButton"
              colorScheme="teal"
              onClick={handleAdd}
            >
              Add
            </Button>
            <Button
              data-testid="cancelButton"
              colorScheme="teal"
              variant="outline"
              onClick={props.onClose}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  //Helper functions to create the list of body types and districts
  function CreateDistrictListOnScreen(currentInput: string, list: any[]) {
    setDistrictListOnScreen(list);
    setListDistrictJSX(CreateListOfDistrict(currentInput, list));
  }

  function CreateElectionListOnScreen(currentInput: string, list: any[]) {
    setElectionListOnScreen(list);
    setListElectionJSX(CreateListOfElection(currentInput, list));
  }

  function CreateTypeListOnScreen(currentInput: string, list: any[]) {
    setTypeListOnScreen(list);
    setListTypeJSX(CreateListOfType(currentInput, list));
  }

  function CreateListOfDistrict(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheDistrict(listToShown, character)}</Wrap>;
  }

  function CreateListOfElection(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheElection(listToShown, character)}</Wrap>;
  }

  function CreateListOfType(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheType(listToShown, character)}</Wrap>;
  }

  function ListTheDistrict(listofDistrict: any[], filterChar: string) {
    var districtList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofDistrict)) {
      districtList = listofDistrict.map((district, index) => {
        if (district[0].includes(filterChar)) {
          return (
            <Button
              key={district[0]}
              onClick={() => {
                handlePointer("districtID", district[0]);
              }}
            >
              {district[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      districtList = [];
    }

    return districtList;
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

  function ListTheType(listofType: any[], filterChar: string) {
    var typeList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofType)) {
      typeList = listofType.map((type, index) => {
        if (type[0].includes(filterChar)) {
          return (
            <Button
              key={type[0]}
              onClick={() => {
                handlePointer("type", type[0]);
              }}
            >
              {type[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      typeList = [];
    }

    return typeList;
  }
}
