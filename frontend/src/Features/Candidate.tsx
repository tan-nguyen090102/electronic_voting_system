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
        if (data.length === 0) {
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
        if (candidate.geographyID.split("-")[2] === inputSelection) {
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
        index: index,
      }),
    })
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
    //Adding toast
    addToast({
      title: "Candidate Deleted!",
      description: `The candidate ${candidate.runnerID} is deleted.`,
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
      <ListNavigationBar indexClick="3"></ListNavigationBar>
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
                    Runner #{candidate.runnerID}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Name: {candidate.name}</ListItem>
                    <ListItem>Date of birth: {candidate.dob}</ListItem>
                    <ListItem>
                      Geography cover: {candidate.geographyID}
                    </ListItem>
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
              <ListItem>Runner ID: {props.candidate.runnerID}</ListItem>
              <ListItem>Name: {props.candidate.name}</ListItem>
              <ListItem>Date of Birth: {props.candidate.dob}</ListItem>
              <ListItem>
                Geography cover: {props.candidate.geographyID}
              </ListItem>
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
    name: "",
    dob: "",
    geographyID: "",
  };

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (inputValue.name && inputValue.dob && inputValue.geographyID) {
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
          name: inputValue.name,
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
        description: `The candidate ${inputValue.name} is ready to serve.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPopUp(true);
    }
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
            <FormLabel>Full name:</FormLabel>
            <Input
              name="name"
              data-testid="name"
              onChange={handleInput}
              value={inputValue.name}
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
}