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
  candidate: any;
  index: number;
}

interface ModalProps {
  isLaunched: boolean;
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

export default function CandidatePanel() {
  //Adding box
  const modalBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_CANDIDATE_SHOWN = 100;

  //Change web title
  useEffect(() => {
    document.title = "Candidate - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedCandidateList, setCandidateList] = React.useState<Array<any>>(
    []
  );
  const [copyCandidateList, setCopyCandiadteList] = React.useState<Array<any>>(
    []
  );
  const [currentCandidate, setCurrentCandidate] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  useEffect(() => {
    fetch("http://localhost:5000/candidate")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setCandidateList([]);
          setCopyCandiadteList([]);
          handlePointer([], -1);
        } else {
          setCandidateList(data);
          setCopyCandiadteList(data);
          handlePointer(data[0], 0);
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
      const filteredCandidate = copyCandidateList?.map((candidate, index) => {
        if (candidate[4].split("-")[2] === inputSelection) {
          return candidate;
        } else {
          return [];
        }
      });
      for (let i = 0; i < filteredCandidate.length; i++) {
        if (filteredCandidate[i].length !== 0) {
          setNoMatchPopUp(false);
          break;
        } else {
          setNoMatchPopUp(true);
        }
      }

      setCandidateList(filteredCandidate);
    } else {
      setCandidateList(copyCandidateList);
      setNoMatchPopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (candidate: any, index: number) => {
    setCurrentCandidate(candidate);
    setCurrentIndex(index);
  };

  //Delete button listener
  const handleDelete = async (candidate: any, index: number) => {
    await fetch("http://localhost:5000/candidate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        candidateID: candidate[0],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "Candidate Deleted!",
      description: `The candidate ${candidate[0]} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/candidate")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setCandidateList([]);
          setCopyCandiadteList([]);
        } else {
          setCandidateList(data);
          setCopyCandiadteList(data);
        }
      });
  };

  //Container for state options
  const stateOptions = (
    <>
      <option value="ALL">All</option>
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
      <NavBar title={"Candidates"} isLoggedIn="true" userName={user}></NavBar>
      <ListNavigationBar indexClick="4"></ListNavigationBar>
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
                  Current registered candidates: {receivedCandidateList?.length}
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
          <Accordion allowMultiple>
            {CreateAccordionItem(receivedCandidateList)}
          </Accordion>
          {isNoMatchPopUp && (
            <Text data-testid="invalidInput" mb={3}>
              There is no candidate that matched the filtered state.
            </Text>
          )}
          <CreateAddModalBox
            isOpen={modalBox.isOpen}
            onClose={modalBox.onClose}
            handleRefreshList={handleRefreshList}
            isLaunched={modalBox.isOpen}
          ></CreateAddModalBox>
          <Button
            data-testid="addButton"
            colorScheme="teal"
            mt={3}
            onClick={modalBox.onOpen}
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
    const candidateDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_CANDIDATE_SHOWN).map((candidate, index) => {
        if (candidate.length === 0) {
          return <div key={index}></div>;
        } else {
          return (
            <AccordionItem
              data-testid="accordion"
              width="container.md"
              key={index}
            >
              <h2>
                <AccordionButton
                  onClick={() => {
                    handlePointer(candidate, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    Candidate #{candidate[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>
                      Name: {candidate[1] + " " + candidate[2]}
                    </ListItem>
                    <ListItem>Date of birth: {candidate[3]}</ListItem>
                    <ListItem>Geography Base: {candidate[4]}</ListItem>
                  </List>
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
                    candidate={currentCandidate}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
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
            Delete Candidate
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this candidate from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>Candidate ID: {props.candidate[0]}</ListItem>
              <ListItem>
                Name: {props.candidate[1] + " " + props.candidate[2]}
              </ListItem>
              <ListItem>Date of Birth: {props.candidate[3]}</ListItem>
              <ListItem>Geography Base: {props.candidate[4]}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.candidate, props.index);
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
export function CreateAddModalBox(props: ModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    geographyID: "",
  };

  const [receivedGeographyList, setReceiveGeographyList] = React.useState<
    Array<any>
  >([]);
  const [geographyListOnScreen, setGeographyListOnScreen] = React.useState<
    Array<any>
  >([]);
  if (props.isLaunched) {
    fetch("http://localhost:5000/candidate/add")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setReceiveGeographyList([]);
          setGeographyListOnScreen([]);
        } else {
          setReceiveGeographyList(data);
          setGeographyListOnScreen(data);
        }
      });
  }

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listGeographyJSX, setListGeographyJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "geographyID") {
      CreateGeographyListOnScreen(value, geographyListOnScreen);
    }
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (
      inputValue.firstName &&
      inputValue.lastName &&
      inputValue.dob &&
      inputValue.geographyID
    ) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/candidate/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          dob: inputValue.dob,
          geographyID: inputValue.geographyID,
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "Candidate Added!",
        description: `The candidate ${
          inputValue.firstName + " " + inputValue.lastName
        } is ready to serve.`,
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

    CreateGeographyListOnScreen("", []);
    setGeographyListOnScreen(receivedGeographyList);
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
        <ModalHeader>Add new candidate</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}
          <FormControl>
            <FormLabel>First name:</FormLabel>
            <Input
              name="firstName"
              data-testid="firstName"
              onChange={handleInput}
              value={inputValue.firstName}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Last name:</FormLabel>
            <Input
              name="lastName"
              data-testid="lastName"
              onChange={handleInput}
              value={inputValue.lastName}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Geography ID:</FormLabel>
            <Input
              name="geographyID"
              data-testid="geographyID"
              onChange={handleInput}
              value={inputValue.geographyID}
              placeholder="City-County-State"
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          {listGeographyJSX}
          <Wrap align="baseline" spacing="20px" mt={3}>
            <FormLabel>Date of Birth: </FormLabel>
            <Input
              name="dob"
              data-testid="dob"
              placeholder="Date of Birth"
              type="date"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.dob}
              max={new Date().toISOString().split("T")[0]}
            ></Input>
          </Wrap>
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

  function CreateGeographyListOnScreen(currentInput: string, list: any[]) {
    setGeographyListOnScreen(list);
    setListGeographyJSX(CreateListOfGeography(currentInput, list));
  }

  function CreateListOfGeography(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheGeography(listToShown, character)}</Wrap>;
  }

  function ListTheGeography(listofGeography: any[], filterChar: string) {
    var geographyList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofGeography)) {
      geographyList = listofGeography.map((geography, index) => {
        if (geography[0].includes(filterChar)) {
          return (
            <Button
              key={geography[0]}
              onClick={() => {
                handlePointer("geographyID", geography[0]);
              }}
            >
              {geography[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      geographyList = [];
    }

    return geographyList;
  }
}
