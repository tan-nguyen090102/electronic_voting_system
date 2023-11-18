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
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

interface ModalProps {
  isOpen: any;
  onClose: any;
  handleRefreshList: any;
}

export default function PrecinctPanel() {
  //Adding box
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  useEffect(() => {
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
        if (precinct.district.split("-")[0] === inputSelection) {
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
        index: index,
      }),
    })
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
            isOpen={isOpen}
            onClose={onClose}
            handleRefreshList={handleRefreshList}
          ></CreateAddModalBox>
          <Button
            data-testid="addButton"
            colorScheme="teal"
            mt={3}
            onClick={onOpen}
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
    //Toast
    const addToast = useToast();

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
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Station #{precinct.precinctID}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Station address: {precinct.address}</ListItem>
                    <ListItem>Head manager: {precinct.head}</ListItem>
                    <ListItem>
                      District registered: {precinct.district}
                    </ListItem>
                    <ListItem>Geography cover: {precinct.geographyID}</ListItem>
                  </List>
                  <Button
                    data-testid="deleteButton"
                    bg="red.400"
                    onClick={() => {
                      handleDelete(precinct, index);
                      //Adding toast
                      addToast({
                        title: "Precinct Deleted!",
                        description: `The precinct station ${precinct.precinctID} is deleted.`,
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return precinctDetails;
  }
}

//Modal box for adding precinct
export function CreateAddModalBox(props: ModalProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    precinctID: "",
    head: "",
    address: "",
    geographyID: "",
    covers: "",
  };

  //Backend fetch the list of available zip
  const [recievedZipList, setReceiveZipList] = React.useState<Array<any>>([]);
  const [listOnScreen, setListOnScreen] = React.useState<Array<any>>([]);
  useEffect(() => {
    fetch("http://localhost:5000/precinct/add")
      .then((response) => response.json())
      .then((data) => {
        setReceiveZipList(data);
        setListOnScreen(data);
      });
  }, []);

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [listJSX, setListJSX] = React.useState<JSX.Element>();
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "covers") {
      CreateListOnScreen(value, listOnScreen);
    }
  };

  //Add button listener
  const [isPopUp, setPopUp] = React.useState(false);
  const handleAdd = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (
      inputValue.precinctID &&
      inputValue.head &&
      inputValue.address &&
      inputValue.geographyID &&
      listZipHasBeenTagged.length !== 0
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
          precinctID: inputValue.precinctID,
          head: inputValue.head,
          address: inputValue.address,
          geographyID: inputValue.geographyID,
          covers: StrinifyZip(listZipHasBeenTagged),
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "Precinct Added!",
        description: `The precinct station ${inputValue.precinctID} is ready to be deployed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setPopUp(true);
    }
  };

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
        <ModalHeader>Add new precinct</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}
          <FormControl>
            <FormLabel>ID:</FormLabel>
            <Input
              name="precinctID"
              data-testid="precinctIDInput"
              onChange={handleInput}
              value={inputValue.precinctID}
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
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
          {listJSX}
          <ModalFooter>
            <Wrap spacing="20px">
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
              >
                Cancel
              </Button>
            </Wrap>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  //Helper functions to create the tags and lists of zipcodes
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
    if (filterChar !== "") {
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
  }
}
