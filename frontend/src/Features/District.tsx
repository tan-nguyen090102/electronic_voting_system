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
  district: any;
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
  district: any;
  index: number;
  handleEditDistrict: any;
}

export default function DistrictPanel() {
  //Adding box
  const modalAddBox = useDisclosure();
  const modalEditBox = useDisclosure();
  const alertBox = useDisclosure();

  //Toast
  const addToast = useToast();

  //Limit of element shown on lists
  const MAX_DISTRICT_SHOWN = 100;

  //Change web title
  useEffect(() => {
    document.title = "Districts - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedDistrictList, setDistrictList] = React.useState<Array<any>>(
    []
  );
  const [copyDistrictList, setCopyDistrictList] = React.useState<Array<any>>(
    []
  );
  const [currentDisctrict, setCurrentDistrict] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  useEffect(() => {
    fetch("http://localhost:5000/district")
      .then((response) => response.json())
      .then((data) => {
        if (data === "False") {
          setDistrictList([]);
          setCopyDistrictList([]);
          handlePointer([], -1);
        } else {
          setDistrictList(data);
          setCopyDistrictList(data);
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
      const filteredDistrict = copyDistrictList?.map((district) => {
        if (district[0].split("-")[0] === inputSelection) {
          return district;
        } else {
          return [];
        }
      });
      for (let i = 0; i < filteredDistrict.length; i++) {
        if (filteredDistrict[i].length !== 0) {
          setNoMatchPopUp(false);
          break;
        } else {
          setNoMatchPopUp(true);
        }
      }

      setDistrictList(filteredDistrict);
    } else {
      setDistrictList(copyDistrictList);
      setNoMatchPopUp(false);
    }
  };

  //Pointer to current Accordion item
  const handlePointer = (district: any, index: number) => {
    setCurrentDistrict(district);
    setCurrentIndex(index);
  };

  //Edit button listener
  const handleEditDistrict = async (
    district: any,
    title: string,
    officialID: string
  ) => {
    if (title === "") {
      title = district[1];
    }
    if (officialID === "") {
      officialID = district[2];
    }
    await fetch("http://localhost:5000/district/edit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        districtID: district[0],
        title: title,
        officialName: officialID,
      }),
    });

    handleRefreshList();
  };

  //Delete button listener
  const handleDelete = async (district: any, index: number) => {
    await fetch("http://localhost:5000/district", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        districtID: district[0],
      }),
    });
    handleRefreshList();

    //Adding toast
    addToast({
      title: "District Deleted!",
      description: `The district ${district[0]} is deleted.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  //Refresh from adding box listener
  const handleRefreshList = () => {
    fetch("http://localhost:5000/district")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setDistrictList([]);
          setCopyDistrictList([]);
        } else {
          setDistrictList(data);
          setCopyDistrictList(data);
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
      <NavBar title={"Districts"} isLoggedIn="true" userName={user}></NavBar>
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
                  Current registered districts: {receivedDistrictList?.length}
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
            {CreateAccordionItem(receivedDistrictList)}
          </Accordion>
          {isNoMatchPopUp && (
            <Text data-testid="invalidInput" mb={3}>
              There is no district that matched the filtered state.
            </Text>
          )}
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
    const districtDetails =
      Array.isArray(jsonList) &&
      jsonList.slice(0, MAX_DISTRICT_SHOWN).map((district, index) => {
        if (district.length === 0) {
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
                    handlePointer(district, index);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    District #{district[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                <Stack direction="row" justifyContent="flex-end">
                  <List marginRight="auto">
                    <ListItem>Title: {district[1]}</ListItem>
                    <ListItem>Current head official: {district[2]}</ListItem>
                  </List>
                  <CreateEditModalBox
                    isOpen={modalEditBox.isOpen}
                    onClose={modalEditBox.onClose}
                    handleEditDistrict={handleEditDistrict}
                    district={currentDisctrict}
                    index={currentIndex}
                  ></CreateEditModalBox>
                  <Button
                    data-testid="editButton"
                    colorScheme="teal"
                    onClick={() => {
                      modalEditBox.onOpen();
                    }}
                  >
                    Edit
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
                    district={currentDisctrict}
                    index={currentIndex}
                  ></CreateAlertBox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      });
    return districtDetails;
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
            Delete District
          </AlertDialogHeader>
          <AlertDialogBody>
            <b>Are you sure to remove this district from the system?</b>
            <List marginRight="auto" mt={3}>
              <ListItem>District ID: {props.district[0]}</ListItem>
              <ListItem>Title: {props.district[1]}</ListItem>
              <ListItem>Current head official: {props.district[2]}</ListItem>
            </List>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleDelete(props.district, props.index);
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

//Modal box for adding district
export function CreateAddModalBox(props: ModalAddProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    districtID: "",
    title: "",
    officialID: "",
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
    if (inputValue.districtID && inputValue.title && inputValue.officialID) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUp(false);
      await fetch(`http://localhost:5000/district/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          districtID: inputValue.districtID,
          title: inputValue.title,
          officialName: inputValue.officialID,
        }),
      });

      //Call from the top DOM
      props.onClose();
      props.handleRefreshList();

      //Adding toast
      addToast({
        title: "District Added!",
        description: `The district ${inputValue.districtID} is ready to deployed.`,
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
        <ModalHeader>Add new district</ModalHeader>
        <ModalBody>
          {isPopUp && (
            <Text data-testid="unfilledFields" color="red" mb={3}>
              *Please fill out all required fields*
            </Text>
          )}
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
            <FormLabel>Official ID:</FormLabel>
            <Input
              name="officialID"
              data-testid="officialID"
              onChange={handleInput}
              value={inputValue.officialID}
              placeholder="If there are no officials, please type N/A"
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
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

//Modal box for edit district
export function CreateEditModalBox(props: ModalEditProps) {
  //Toast
  const addToast = useToast();

  //Sets of initial values
  const initialValues = {
    title: "",
    officialID: "",
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
    props.handleEditDistrict(
      props.district,
      inputValue.title,
      inputValue.officialID
    );
    props.onClose();

    //Adding toast
    addToast({
      title: "District Edited!",
      description: `The district ${props.district[0]} is ready to deployed.`,
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
        <ModalHeader>Edit district</ModalHeader>
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
          <FormControl>
            <FormLabel>Official ID:</FormLabel>
            <Input
              name="officialID"
              data-testid="officialID"
              onChange={handleInput}
              value={inputValue.officialID}
              placeholder="If there are no officials, please type N/A"
              variant="filled"
              background="gray.200"
            ></Input>
          </FormControl>
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
