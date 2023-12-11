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
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

interface AlertProps {
  isOpen: any;
  onClose: any;
  handleDelete: any;
  ballot: any;
  index: number;
}

interface AddModalProps {
  isLaunched: any;
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

export default function BallotAdminPanel() {
  //Adding box
  const addModalBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_BALLOT_SHOWN = 50;

  //Change web title
  useEffect(() => {
    document.title = "Ballot - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedBallotList, setBallotList] = React.useState<Array<any>>([]);
  const [copyBallotlist, setCopyBallotList] = React.useState<Array<any>>([]);
  const [currentBallot, setCurrentBallot] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  useEffect(() => {
    fetch("http://localhost:5000/ballot_admin")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setBallotList([]);
          setCopyBallotList([]);
          handlePointer([], -1);
        } else {
          setBallotList(data);
          setCopyBallotList(data);
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
      const filteredBallot = copyBallotlist?.map((ballot) => {
        if (ballot[2].split("-")[0] === inputSelection) {
          return ballot;
        } else {
          return [];
        }
      });
      for (let i = 0; i < filteredBallot.length; i++) {
        if (filteredBallot[i].length !== 0) {
          setNoMatchPopUp(false);
          break;
        } else {
          setNoMatchPopUp(true);
        }
      }

      setBallotList(filteredBallot);
    } else {
      setBallotList(copyBallotlist);
      setNoMatchPopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (ballot: any, index: number) => {
    setCurrentBallot(ballot);
    setCurrentIndex(index);
  };

  //Delete button listener
  const handleDelete = async (ballot: any, index: number) => {
    await fetch("http://localhost:5000/ballot_admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        ballotID: ballot[0],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "Ballot Deleted!",
      description: `The ballot ${ballot[0]} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/ballot_admin")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setBallotList([]);
          setCopyBallotList([]);
          handlePointer([], -1);
        } else {
          setBallotList(data);
          setCopyBallotList(data);
          handlePointer(data[0], 0);
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
        title={"Ballots"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="admin"
      ></NavBar>
      <ListNavigationBar indexClick="8"></ListNavigationBar>
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
                  Current registered ballots: {receivedBallotList?.length}
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
            {CreateAccordionItem(receivedBallotList)}
          </Accordion>
          {isNoMatchPopUp && (
            <Text data-testid="invalidInput" mb={3}>
              There is no ballot that matched the filtered state.
            </Text>
          )}
          <CreateAddModalBox
            isOpen={addModalBox.isOpen}
            onClose={addModalBox.onClose}
            handleRefreshList={handleRefreshList}
            isLaunched={addModalBox.isOpen}
          ></CreateAddModalBox>
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
    const ballotDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_BALLOT_SHOWN).map((ballot, index) => {
        if (ballot.length === 0) {
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
                    handlePointer(ballot, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    Ballot #{ballot[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Precint ID: {ballot[2]}</ListItem>
                    <ListItem>Race ID: {ballot[1]}</ListItem>
                    <ListItem>Election ID: {ballot[4]}</ListItem>
                    <ListItem>
                      <b>Status: {ballot[3].toUpperCase()}</b>
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
                    ballot={currentBallot}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return ballotDetails;
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
            Delete Ballot
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this ballot from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>Ballot ID: {props.ballot[0]}</ListItem>
              <ListItem>Precinct ID: {props.ballot[2]}</ListItem>
              <ListItem>Race ID: {props.ballot[1]}</ListItem>
              <ListItem>Election ID: {props.ballot[4]}</ListItem>
              <ListItem>
                <b>Status: {props.ballot[3].toUpperCase()}</b>
              </ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.ballot, props.index);
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

//Modal box for adding race
export function CreateAddModalBox(props: AddModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    precinctIDcovers: "",
    raceIDcovers: "",
  };

  //Backend fetch the list of available zip
  const [receivedPrecinctList, setReceivePrecinctList] = React.useState<
    Array<any>
  >([]);
  const [receivedRaceList, setReceiveRaceList] = React.useState<Array<any>>([]);
  const [precinctListOnScreen, setPrecinctListOnScreen] = React.useState<
    Array<any>
  >([]);
  const [raceListOnScreen, setRaceListOnScreen] = React.useState<Array<any>>(
    []
  );

  useEffect(() => {
    if (props.isLaunched) {
      fetch("http://localhost:5000/ballot_admin/add")
        .then((response) => response.json())
        .then((data) => {
          var raceList: any;
          var precinctList: any;
          if (Array.isArray(data)) {
            raceList = data.pop();
            precinctList = data.pop();
          }
          setReceiveRaceList(raceList);
          setRaceListOnScreen(raceList);
          setReceivePrecinctList(precinctList);
          setPrecinctListOnScreen(precinctList);
        });
    }
  }, [props.isLaunched]);

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listPrecinctJSX, setListPrecinctJSX] = React.useState<JSX.Element>();
  const [listRaceJSX, setListRaceJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "precinctIDcovers") {
      CreatePrecinctListOnScreen(value, precinctListOnScreen);
    }
    if (name === "raceIDcovers") {
      CreateRaceListOnScreen(value, raceListOnScreen);
    }
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (
      listPrecinctHasBeenTagged.length !== 0 &&
      listRaceHasBeenTagged.length !== 0
    ) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/ballot_admin/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          precinctIDList: StrinifyList(listPrecinctHasBeenTagged),
          raceIDList: StrinifyList(listRaceHasBeenTagged),
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "Ballot Added!",
        description: `The ballot is ready to be deployed.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPopUp(true);
    }
  };

  const [listPrecinctHasBeenTagged, setListPrecinctBeenTagged] = React.useState<
    Array<any>
  >([]);
  const [listRaceHasBeenTagged, setListRaceBeenTagged] = React.useState<
    Array<any>
  >([]);
  const [precinctTagJSX, setPrecinctTagJSX] = React.useState<
    Array<JSX.Element>
  >([]);
  const [raceTagJSX, setRaceTagJSX] = React.useState<Array<JSX.Element>>([]);

  //Tag listeners for precinct
  const handleRemovePrecinct = (precinct: any, tagValue: string) => {
    //Make Tags
    precinctTagJSX.push(
      <Tag
        size="sm"
        key={tagValue}
        borderRadius="full"
        variant="solid"
        colorScheme="green"
      >
        <TagLabel>{tagValue}</TagLabel>
        <TagCloseButton
          onClick={() => {
            handleAddBackPrecinct(precinct);
          }}
        ></TagCloseButton>
      </Tag>
    );
    listPrecinctHasBeenTagged.push(precinct);
    var filtered: any[] = [];
    precinctListOnScreen.forEach((element) => {
      if (!listPrecinctHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    CreatePrecinctListOnScreen(inputValue.precinctIDcovers, filtered);
  };

  //Close tag icon listeners
  const handleAddBackPrecinct = (zip: any) => {
    //Move item to the back and pop it
    let index = listPrecinctHasBeenTagged.indexOf(zip);
    listPrecinctHasBeenTagged.push(
      listPrecinctHasBeenTagged.splice(index, 1)[0]
    );
    listPrecinctHasBeenTagged.pop();

    var filtered: any[] = [];
    receivedPrecinctList.forEach((element) => {
      if (!listPrecinctHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    //Move item to the back and pop it
    precinctTagJSX.push(precinctTagJSX.splice(index, 1)[0]);
    precinctTagJSX.pop();

    CreatePrecinctListOnScreen(inputValue.precinctIDcovers, filtered);
  };

  //Tag listeners for electoral race
  const handleRemoveRace = (race: any, tagValue: string) => {
    //Make Tags
    raceTagJSX.push(
      <Tag
        size="sm"
        key={tagValue}
        borderRadius="full"
        variant="solid"
        colorScheme="green"
      >
        <TagLabel>{tagValue}</TagLabel>
        <TagCloseButton
          onClick={() => {
            handleAddBackrace(race);
          }}
        ></TagCloseButton>
      </Tag>
    );
    listRaceHasBeenTagged.push(race);
    var filtered: any[] = [];
    raceListOnScreen.forEach((element) => {
      if (!listRaceHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    CreateRaceListOnScreen(inputValue.raceIDcovers, filtered);
  };

  //Close tag icon listeners
  const handleAddBackrace = (zip: any) => {
    //Move item to the back and pop it
    let index = listRaceHasBeenTagged.indexOf(zip);
    listRaceHasBeenTagged.push(listRaceHasBeenTagged.splice(index, 1)[0]);
    listRaceHasBeenTagged.pop();

    var filtered: any[] = [];
    receivedRaceList.forEach((element) => {
      if (!listRaceHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    //Move item to the back and pop it
    raceTagJSX.push(raceTagJSX.splice(index, 1)[0]);
    raceTagJSX.pop();

    CreateRaceListOnScreen(inputValue.raceIDcovers, filtered);
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
        <ModalHeader>Add new ballot</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}

          <FormControl>
            <FormLabel>Precinct covers:</FormLabel>
            <Wrap spacing="10px">{precinctTagJSX}</Wrap>
            <Input
              name="precinctIDcovers"
              data-testid="precinctIDcovers"
              onChange={handleInput}
              value={inputValue.precinctIDcovers}
              variant="filled"
              background="gray.200"
              mt={listPrecinctHasBeenTagged.length === 0 ? 0 : 3}
            ></Input>
          </FormControl>
          {listPrecinctJSX}
          <FormControl>
            <FormLabel>Race covers:</FormLabel>
            <Wrap spacing="10px">{raceTagJSX}</Wrap>
            <Input
              name="raceIDcovers"
              data-testid="raceIDcovers"
              onChange={handleInput}
              value={inputValue.raceIDcovers}
              variant="filled"
              background="gray.200"
              mt={listRaceHasBeenTagged.length === 0 ? 0 : 3}
            ></Input>
          </FormControl>
          {listRaceJSX}
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
  function CreatePrecinctListOnScreen(currentInput: string, list: any[]) {
    setListPrecinctBeenTagged(listPrecinctHasBeenTagged);
    setPrecinctTagJSX(precinctTagJSX);
    setPrecinctListOnScreen(list);
    setListPrecinctJSX(CreateListOfPrecinct(currentInput, list));
  }

  function CreateRaceListOnScreen(currentInput: string, list: any[]) {
    setListRaceBeenTagged(listRaceHasBeenTagged);
    setRaceTagJSX(raceTagJSX);
    setRaceListOnScreen(list);
    setListRaceJSX(CreateListOfRace(currentInput, list));
  }

  function CreateListOfPrecinct(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListThePrecinct(listToShown, character)}</Wrap>;
  }

  function CreateListOfRace(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheRace(listToShown, character)}</Wrap>;
  }

  function ListThePrecinct(listofPrecinct: any[], filterChar: string) {
    var precinctList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofPrecinct)) {
      precinctList = listofPrecinct.map((precinct, index) => {
        if (precinct[0].includes(filterChar)) {
          return (
            <Button
              key={precinct[0]}
              onClick={() => {
                handleRemovePrecinct(precinct, precinct[0]);
              }}
            >
              {precinct[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      precinctList = [];
    }

    return precinctList;
  }

  function ListTheRace(listofRace: any[], filterChar: string) {
    var raceList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofRace)) {
      raceList = listofRace.map((race, index) => {
        if (race[0].includes(filterChar)) {
          return (
            <Button
              key={race[0]}
              onClick={() => {
                handleRemoveRace(race, race[0]);
              }}
            >
              {race[0]}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      raceList = [];
    }

    return raceList;
  }

  function StrinifyList(list: any[]) {
    var listofString: string[] = [];
    list.forEach((element) => {
      listofString.push(element[0]);
    });

    return listofString;
  }
}
