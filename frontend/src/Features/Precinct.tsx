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
  Tag,
  TagLabel,
  TagCloseButton,
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
  precinct: any;
  index: number;
}

interface ModalProps {
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

export default function PrecinctPanel() {
  //Adding box
  const modalBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_PRECINCT_SHOWN = 20;

  //Change web title
  useEffect(() => {
    document.title = "Precinct - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedPrecinctList, setPrecinctList] = React.useState<Array<any>>(
    []
  );
  const [copyPrecinctList, setCopyPrecinctList] = React.useState<Array<any>>(
    []
  );
  const [currentPrecinct, setCurrentPrecinct] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  useEffect(() => {
    fetch("http://localhost:5000/precinct")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "False") {
          setPrecinctList([]);
          setCopyPrecinctList([]);
          handlePointer([], -1);
        } else {
          setPrecinctList(data);
          setCopyPrecinctList(data);
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
      const filteredPrecinct = copyPrecinctList?.map((precinct, index) => {
        if (precinct[0].split("-")[0] === inputSelection) {
          return precinct;
        } else {
          return [];
        }
      });
      for (let i = 0; i < filteredPrecinct.length; i++) {
        if (filteredPrecinct[i].length !== 0) {
          setNoMatchPopUp(false);
          break;
        } else {
          setNoMatchPopUp(true);
        }
      }

      setPrecinctList(filteredPrecinct);
    } else {
      setPrecinctList(copyPrecinctList);
      setNoMatchPopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (precinct: any, index: number) => {
    setCurrentPrecinct(precinct);
    setCurrentIndex(index);
  };

  //Delete button listener
  const handleDelete = async (precinct: any, index: number) => {
    await fetch("http://localhost:5000/precinct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        precinctID: precinct[0],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "Precinct Deleted!",
      description: `The precinct station ${precinct.precinctID} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/precinct")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setPrecinctList([]);
          setCopyPrecinctList([]);
        } else {
          setPrecinctList(data);
          setCopyPrecinctList(data);
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
      <NavBar title={"Precincts"} isLoggedIn="true" userName={user}></NavBar>
      <ListNavigationBar indexClick="2"></ListNavigationBar>
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
                  Current registered precincts: {receivedPrecinctList?.length}
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
            {CreateAccordionItem(receivedPrecinctList)}
          </Accordion>
          {isNoMatchPopUp && (
            <Text data-testid="invalidInput" mb={3}>
              There is no precinct that matched the filtered state.
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
    const precinctDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_PRECINCT_SHOWN).map((precinct, index) => {
        if (precinct.length === 0) {
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
                    handlePointer(precinct, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    Station #{precinct[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Station address: {precinct[1]}</ListItem>
                    <ListItem>
                      Head manager: {precinct[3] + " " + precinct[4]}
                    </ListItem>
                    <ListItem>District registered: {precinct[2]}</ListItem>
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
                    precinct={currentPrecinct}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return precinctDetails;
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
            Delete Precinct
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this precinct from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>Station ID: {props.precinct[0]}</ListItem>
              <ListItem>Station address: {props.precinct[1]}</ListItem>
              <ListItem>
                Head manager: {props.precinct[3] + " " + props.precinct[4]}
              </ListItem>
              <ListItem>District registered: {props.precinct[2]}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.precinct, props.index);
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

//Modal box for adding precinct
export function CreateAddModalBox(props: ModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    head: "",
    address: "",
    geographyID: "",
    districtID: "",
    covers: "",
  };

  //Backend fetch the list of available zip
  const [recievedZipList, setReceiveZipList] = React.useState<Array<any>>([]);
  const [listOnScreen, setListOnScreen] = React.useState<Array<any>>([]);
  const [receivedDistrictList, setReceiveDistrictList] = React.useState<
    Array<any>
  >([]);
  const [districtListOnScreen, setDistrictListOnScreen] = React.useState<
    Array<any>
  >([]);
  const [receivedGeographyList, setReceiveGeographyList] = React.useState<
    Array<any>
  >([]);
  const [geographyListOnScreen, setGeographyListOnScreen] = React.useState<
    Array<any>
  >([]);

  /*
  useEffect(() => {
    fetch("http://localhost:5000/precinct/add")
      .then((response) => response.json())
      .then((data) => {
        setReceiveZipList(data);
        setListOnScreen(data);
      });
  }, []);*/

  useEffect(() => {
    fetch("http://localhost:5000/precinct/add")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setReceiveDistrictList([]);
          setDistrictListOnScreen([]);
          setReceiveGeographyList([]);
          setGeographyListOnScreen([]);
        } else {
          setReceiveDistrictList(data[0]);
          setDistrictListOnScreen(data[0]);
          setReceiveGeographyList(data[1]);
          setGeographyListOnScreen(data[1]);
        }
      });
  }, []);

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listJSX, setListJSX] = React.useState<JSX.Element>();
  const [listDistrictJSX, setListDistrictJSX] = React.useState<JSX.Element>();
  const [listGeographyJSX, setListGeographyJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "districtID") {
      CreateDistrictListOnScreen(value, districtListOnScreen);
    }

    if (name === "geographyID") {
      CreateGeographyListOnScreen(value, geographyListOnScreen);
    }

    /*
    if (name === "covers") {
      CreateListOnScreen(value, listOnScreen);
    }*/
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const [fieldNotFoundPopUp, setFieldNotFoundPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (
      inputValue.head &&
      inputValue.address &&
      inputValue.geographyID &&
      inputValue.districtID
      //listZipHasBeenTagged.length !== 0
    ) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/precinct/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          head: inputValue.head,
          address: inputValue.address,
          geographyID: inputValue.geographyID,
          districtID: inputValue.districtID,
          //covers: StrinifyZip(listZipHasBeenTagged),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "true") {
            setFieldNotFoundPopUp(false);
            //Call from the top DOM
            props.onClose();
            props.handleRefreshList();

            //Adding toast
            addToast({
              title: "Precinct Added!",
              description: `The precinct station is ready to be deployed.`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            setFieldNotFoundPopUp(true);
            props.handleRefreshList();
            return;
          }
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
    setDistrictListOnScreen(receivedDistrictList);
    CreateGeographyListOnScreen("", []);
    setGeographyListOnScreen(receivedGeographyList);
  };

  /*
  //Tag open button listeners
  const [listZipHasBeenTagged, setListZipBeenTagged] = React.useState<
    Array<any>
  >([]);
  const [tagJSX, setTagJSX] = React.useState<Array<JSX.Element>>([]);

  const handleRemoveZip = (zip: any, tagValue: string) => {
    //Make Tags
    tagJSX.push(
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
            handleAddBackZip(zip);
          }}
        ></TagCloseButton>
      </Tag>
    );
    listZipHasBeenTagged.push(zip);
    var filtered: any[] = [];
    listOnScreen.forEach((element) => {
      if (!listZipHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    CreateListOnScreen(inputValue.covers, filtered);
  };

  //Close tag icon listeners
  const handleAddBackZip = (zip: any) => {
    //Move item to the back and pop it
    let index = listZipHasBeenTagged.indexOf(zip);
    listZipHasBeenTagged.push(listZipHasBeenTagged.splice(index, 1)[0]);
    listZipHasBeenTagged.pop();

    var filtered: any[] = [];
    recievedZipList.forEach((element) => {
      if (!listZipHasBeenTagged.includes(element)) {
        filtered.push(element);
      }
    });
    //Move item to the back and pop it
    tagJSX.push(tagJSX.splice(index, 1)[0]);
    tagJSX.pop();

    CreateListOnScreen(inputValue.covers, filtered);
  };*/

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
        <ModalHeader>Add new precinct</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}
          <FormControl>
            <FormLabel>Head manager:</FormLabel>
            <Input
              name="head"
              data-testid="head"
              onChange={handleInput}
              value={inputValue.head}
              variant="filled"
              background="gray.200"
            ></Input>
            {fieldNotFoundPopUp && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Head manager not found in our system*
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Address:</FormLabel>
            <Input
              name="address"
              data-testid="address"
              onChange={handleInput}
              value={inputValue.address}
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
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
          {listGeographyJSX}
          <FormControl>
            <FormLabel>District ID:</FormLabel>
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

          {/*
          <FormControl>
            <FormLabel>Zip covers:</FormLabel>
            <Wrap spacing="10px">{tagJSX}</Wrap>
            <Input
              name="covers"
              data-testid="covers"
              onChange={handleInput}
              value={inputValue.covers}
              variant="filled"
              background="gray.200"
              mt={listZipHasBeenTagged.length === 0 ? 0 : 3}
            ></Input>
          </FormControl>
          {listJSX}*/}
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

  //Helper functions to create the tags and lists of zipcodes
  function CreateDistrictListOnScreen(currentInput: string, list: any[]) {
    setDistrictListOnScreen(list);
    setListDistrictJSX(CreateListOfDistrict(currentInput, list));
  }

  function CreateGeographyListOnScreen(currentInput: string, list: any[]) {
    setGeographyListOnScreen(list);
    setListGeographyJSX(CreateListOfGeography(currentInput, list));
  }

  function CreateListOfDistrict(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheDistrict(listToShown, character)}</Wrap>;
  }

  function CreateListOfGeography(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheGeography(listToShown, character)}</Wrap>;
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

  /*
  function CreateListOnScreen(currentInput: string, list: any[]) {
    setListZipBeenTagged(listZipHasBeenTagged);
    setTagJSX(tagJSX);
    setListOnScreen(list);
    setListJSX(CreateListOfZipCode(currentInput, list));
  }

  function CreateListOfZipCode(character: string, listToShown: any[]) {
    return <Wrap mt={3}>{ListTheZipCode(listToShown, character)}</Wrap>;
  }

  function ListTheZipCode(listofZip: any[], filterChar: string) {
    var zipList: any[] = [];
    if (filterChar !== "" && Array.isArray(listofZip)) {
      zipList = listofZip.map((zip, index) => {
        if (zip.zip.includes(filterChar)) {
          return (
            <Button
              key={zip.zip}
              onClick={() => {
                handleRemoveZip(zip, zip.zip);
              }}
            >
              {zip.zip}
            </Button>
          );
        } else {
          return <div key={index}></div>;
        }
      });
    } else {
      zipList = [];
    }

    return zipList;
  }

  function StrinifyZip(listofZip: any[]) {
    var zipList: string[] = [];
    listofZip.forEach((zip) => {
      zipList.push(zip.zip);
    });

    return zipList;
  }*/
}
