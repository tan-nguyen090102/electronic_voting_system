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
  election: any;
  index: number;
}

interface ModalAddProps {
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

interface ModalEditProps {
  isOpen: any;
  onClose: any;
  election: any;
  handleEditElection: any;
}

export default function ElectionPanel() {
  //Adding box
  const modalAddBox = useDisclosure();
  const modalEditBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_ELECTION_SHOWN = 20;

  //Change web title
  useEffect(() => {
    document.title = "Elections - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all elections to the page
  const [receivedActiveElectionList, setActiveElectionList] = React.useState<
    Array<any>
  >([]);
  const [receivedInactiveElectionList, setInactiveElectionList] =
    React.useState<Array<any>>([]);
  const [copyElectionList, setCopyElectionList] = React.useState<Array<any>>(
    []
  );
  const [currentElection, setCurrentElection] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [currentDay, setCurrentDay] = React.useState("");
  useEffect(() => {
    var electionLists: any[] = [];
    var today = new Date().toISOString();

    fetch("http://localhost:5000/election")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setActiveElectionList([]);
          setInactiveElectionList([]);
          setCopyElectionList([]);
          handlePointer([], -1);
        } else {
          electionLists = DecomposeJSONObject(data);
          if (electionLists[0].length === 0) {
            setNoMatchActivePopUp(true);
          }
          if (electionLists[1].length === 0) {
            setNoMatchInactivePopUp(true);
          }
          setCopyElectionList(data);
          setActiveElectionList(electionLists[0]);
          setInactiveElectionList(electionLists[1]);
          handlePointer(data[0], 0);
        }
      });

    setCurrentDay(today);
  }, []);

  //Selection listener
  const [inputSelection, setInputSelection] = React.useState("ALL");
  const handleSelection = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputSelection(e.target.value);
  };

  //Filter button listener
  const [isNoMatchActivePopUp, setNoMatchActivePopUp] = React.useState(false);
  const [isNoMatchInactivePopUp, setNoMatchInactivePopUp] =
    React.useState(false);
  const handleFilter = () => {
    if (inputSelection !== "ALL") {
      //Filter the state by selection
      const filteredActiveElection = copyElectionList?.map((election) => {
        if (
          (election.electionID.split("-")[1] === inputSelection ||
            (election.electionID.split("-")[0] === "US" &&
              inputSelection === "US")) &&
          election.status === "active"
        ) {
          return election;
        } else {
          return [];
        }
      });

      const filteredInactiveElection = copyElectionList?.map((election) => {
        if (
          (election.electionID.split("-")[1] === inputSelection ||
            (election.electionID.split("-")[0] === "US" &&
              inputSelection === "US")) &&
          election.status === "inactive"
        ) {
          return election;
        } else {
          return [];
        }
      });

      for (let i = 0; i < filteredActiveElection.length; i++) {
        if (filteredActiveElection[i].length !== 0) {
          setNoMatchActivePopUp(false);
          break;
        } else {
          setNoMatchActivePopUp(true);
        }
      }

      for (let i = 0; i < filteredInactiveElection.length; i++) {
        if (filteredInactiveElection[i].length !== 0) {
          setNoMatchInactivePopUp(false);
          break;
        } else {
          setNoMatchInactivePopUp(true);
        }
      }

      setActiveElectionList(filteredActiveElection);
      setInactiveElectionList(filteredInactiveElection);
    } else {
      setActiveElectionList(DecomposeJSONObject(copyElectionList)[0]);
      setInactiveElectionList(DecomposeJSONObject(copyElectionList)[1]);
      setNoMatchActivePopUp(false);
      setNoMatchInactivePopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (election: any, index: number) => {
    setCurrentElection(election);
    setCurrentIndex(index);
  };

  //Edit button listener
  const handleEditElection = async (
    electionID: string = "",
    title: string = "",
    date: string = "",
    startTime: string = "",
    endTime: string = ""
  ) => {
    await fetch("http://localhost:5000/election/edit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        electionID: electionID,
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setActiveElectionList([]);
          setInactiveElectionList([]);
          setCopyElectionList([]);
        } else {
          var electionLists = DecomposeJSONObject(data);
          setActiveElectionList(electionLists[0]);
          setInactiveElectionList(electionLists[1]);
          setCopyElectionList(data);
        }
      });
  };

  //Delete button listener
  const handleDelete = async (election: any, index: number) => {
    await fetch("http://localhost:5000/election/delete", {
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
          setActiveElectionList([]);
          setInactiveElectionList([]);
          setCopyElectionList([]);
        } else {
          var electionLists = DecomposeJSONObject(data);
          setActiveElectionList(electionLists[0]);
          setInactiveElectionList(electionLists[1]);
          setCopyElectionList(data);
        }
      });
    //Adding toast
    addToast({
      title: "Election Deleted!",
      description: `The election ${election.electionID} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Activate button listener
  const handleActivate = async (election: any) => {
    await fetch("http://localhost:5000/election", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        electionID: election.electionID,
        status: "active",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setActiveElectionList([]);
          setInactiveElectionList([]);
          setCopyElectionList([]);
        } else {
          var electionLists = DecomposeJSONObject(data);
          electionLists[0].length === 0
            ? setNoMatchActivePopUp(true)
            : setNoMatchActivePopUp(false);
          electionLists[1].length === 0
            ? setNoMatchInactivePopUp(true)
            : setNoMatchInactivePopUp(false);
          setActiveElectionList(electionLists[0]);
          setInactiveElectionList(electionLists[1]);
          setCopyElectionList(data);
        }
      });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/election")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setActiveElectionList([]);
          setInactiveElectionList([]);
          setCopyElectionList([]);
        } else {
          var electionLists = DecomposeJSONObject(data);
          setActiveElectionList(electionLists[0]);
          setInactiveElectionList(electionLists[1]);
          setCopyElectionList(data);
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
        title={"Elections"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="admin"
      ></NavBar>
      <ListNavigationBar indexClick="0"></ListNavigationBar>
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
              <Text fontSize="md" mt={0}>
                Current active elections: {receivedActiveElectionList?.length}
              </Text>
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
            <AccordionItem className="activeAccordion" width="container.md">
              <h2>
                <AccordionButton data-testid="activeButton" border="2px">
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>ACTIVE ELECTION</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Accordion allowToggle>
                  {CreateAccordionItem(receivedActiveElectionList as any[])}
                </Accordion>
                {isNoMatchActivePopUp && (
                  <Text data-testid="invalidInput" mb={3}>
                    There is no election that matched the filtered state.
                  </Text>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem width="container.md" className="inactiveAccordion">
              <h2>
                <AccordionButton data-testid="inactiveButton" border="2px">
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>INACTIVE ELECTION</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Accordion allowToggle>
                  {CreateAccordionItem(receivedInactiveElectionList as any[])}
                </Accordion>
                {isNoMatchInactivePopUp && (
                  <Text data-testid="invalidInput" mb={3}>
                    There is no election that matched the filtered state.
                  </Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <CreateAddModalBox
            isOpen={modalAddBox.isOpen}
            onClose={modalAddBox.onClose}
            handleRefreshList={handleRefreshList}
          ></CreateAddModalBox>
          <Button
            data-testid="addButton"
            colorScheme="teal"
            mt={3}
            onClick={modalAddBox.onOpen}
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
    const electionDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_ELECTION_SHOWN).map((election, index) => {
        if (election.length === 0) {
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
                    handlePointer(election, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {election.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>ID: {election.electionID}</ListItem>
                    <ListItem>Date of election: {election.date}</ListItem>
                    <ListItem>
                      Start polling time: {election.startTime}
                    </ListItem>
                    <ListItem>End polling time: {election.endTime}</ListItem>
                  </List>
                  <CreateEditModalBox
                    isOpen={modalEditBox.isOpen}
                    onClose={modalEditBox.onClose}
                    handleEditElection={handleEditElection}
                    election={currentElection}
                  ></CreateEditModalBox>
                  <Button
                    data-testid="activateButton"
                    colorScheme="green"
                    isDisabled={
                      election.status === "active" ||
                      new Date(election.date).toISOString() <= currentDay
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleActivate(election);
                    }}
                  >
                    Activate
                  </Button>
                  <Button
                    data-testid="editButton"
                    colorScheme="teal"
                    isDisabled={
                      election.status === "active" ||
                      new Date(election.date).toISOString() <= currentDay
                        ? true
                        : false
                    }
                    onClick={() => {
                      modalEditBox.onOpen();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    data-testid="deleteButton"
                    bg="red.400"
                    isDisabled={election.status === "active" ? true : false}
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
                    election={currentElection}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return electionDetails;
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
            Delete Election
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this election from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>Title: {props.election.title}</ListItem>
              <ListItem>Election ID: {props.election.electionID}</ListItem>
              <ListItem>Date of election: {props.election.date}</ListItem>
              <ListItem>
                Start polling time: {props.election.startTime}
              </ListItem>
              <ListItem>End polling time: {props.election.endTime}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.election, props.index);
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

//Modal box for adding election
export function CreateAddModalBox(props: ModalAddProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    electionID: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "",
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
    if (
      inputValue.electionID &&
      inputValue.title &&
      inputValue.date &&
      inputValue.startTime &&
      inputValue.endTime
    ) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/election/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          electionID: inputValue.electionID,
          title: inputValue.title,
          date: inputValue.date,
          startTime: inputValue.startTime,
          endTime: inputValue.endTime,
          status: "inactive",
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "Election Added!",
        description: `The election ${inputValue.title} is ready to deployed.`,
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
        <ModalHeader>Add new election</ModalHeader>
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
            <FormLabel>Election ID:</FormLabel>
            <Input
              name="electionID"
              data-testid="electionID"
              onChange={handleInput}
              value={inputValue.electionID}
              placeholder="Initials/City-Year"
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          <Stack direction="row" align="baseline" spacing="33px" mt={3}>
            <FormLabel>Date of Election: </FormLabel>
            <Input
              name="date"
              data-testid="date"
              type="date"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.date}
            ></Input>
          </Stack>
          <Stack direction="row" align="baseline" spacing="20px" mt={3}>
            <FormLabel>Start Polling Time: </FormLabel>
            <Input
              name="startTime"
              data-testid="startTime"
              type="time"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.startTime}
            ></Input>
          </Stack>
          <Stack direction="row" align="baseline" spacing="27px" mt={3}>
            <FormLabel>End Polling Time: </FormLabel>
            <Input
              name="endTime"
              data-testid="endTime"
              type="time"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.endTime}
            ></Input>
          </Stack>
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

//Modal box for edit election
export function CreateEditModalBox(props: ModalEditProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
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

  //Confirm button listener
  const handleConfirm = async () => {
    //Call from the top DOM
    props.handleEditElection(
      props.election.electionID,
      inputValue.title,
      inputValue.date,
      inputValue.startTime,
      inputValue.endTime
    );
    props.onClose();

    //Adding toast
    addToast({
      title: "Election Edited!",
      description: `The election ${props.election.title} is ready to deployed.`,
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
        <ModalHeader>Edit election</ModalHeader>
        <ModalBody>
          <Text data-testid="unfilledFields" mb={3}>
            If there is no change on any field, please leave it as blank.
          </Text>
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
          <Stack direction="row" align="baseline" spacing="33px" mt={3}>
            <FormLabel>Date of Election: </FormLabel>
            <Input
              name="date"
              data-testid="date"
              type="date"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.date}
            ></Input>
          </Stack>
          <Stack direction="row" align="baseline" spacing="20px" mt={3}>
            <FormLabel>Start Polling Time: </FormLabel>
            <Input
              name="startTime"
              data-testid="startTime"
              type="time"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.startTime}
            ></Input>
          </Stack>
          <Stack direction="row" align="baseline" spacing="27px" mt={3}>
            <FormLabel>End Polling Time: </FormLabel>
            <Input
              name="endTime"
              data-testid="endTime"
              type="time"
              width="auto"
              variant="outline"
              border="2px"
              onChange={handleInput}
              value={inputValue.endTime}
            ></Input>
          </Stack>
          <ModalFooter>
            <Button
              data-testid="confirmButton"
              colorScheme="teal"
              onClick={handleConfirm}
            >
              Confirm
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

function DecomposeJSONObject(jsonList: any[] = []) {
  var activeList: any[] = [];
  var inactiveList: any[] = [];
  var today = new Date().toISOString().split("T")[0];

  Object.values(jsonList).forEach((election) => {
    if (election.status === "active" && election.date >= today) {
      activeList.push(election);
    } else if (election.status === "inactive" || election.date < today) {
      inactiveList.push(election);

      //Update the backend with the expired election
      if (election.date < today) {
        fetch("http://localhost:5000/election", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
          body: JSON.stringify({
            electionID: election.electionID,
            status: "inactive",
          }),
        });
      }
    } else {
      return;
    }
  });

  return [activeList, inactiveList];
}
