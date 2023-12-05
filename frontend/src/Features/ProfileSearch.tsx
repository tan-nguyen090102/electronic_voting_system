import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Flex,
  Input,
  Button,
  Wrap,
  Text,
  Stack,
  FormControl,
  FormLabel,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Accordion,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

export default function SearchPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Search - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Set the initial list to be empty
  useEffect(() => {
    setApprovedList([]);
  }, []);

  //Sets of initial values
  const initialValues = {
    name: "",
    zip: "",
    stationID: "",
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

  //Search button listener
  const [receivedApprovedList, setApprovedList] = React.useState<Array<any>>();
  const [isInvalidSearch, setInvalidSearch] = React.useState(false);
  const handleSearch = async () => {
    let isFilled = false;

    //Check if there is at least one field filled in
    if (inputValue.name || inputValue.stationID || inputValue.zip) {
      isFilled = true;
      setInvalidSearch(false);
    } else {
      setInvalidSearch(true);
    }

    if (isFilled) {
      //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
      await fetch(`http://localhost:5000/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          name: inputValue.name,
          zip: inputValue.zip,
          stationID: inputValue.stationID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          var jsonList = DecomposeJSONObject(data);
          setApprovedList(jsonList.pop());
        });
    } else {
      setApprovedList([]);
    }
  };

  //DOM
  return (
    <div>
      <NavBar
        title={"User Profile Search"}
        isLoggedIn="true"
        userName={user}
      ></NavBar>
      <ListNavigationBar indexClick="5"></ListNavigationBar>
      <Flex height="auto" alignItems="left" justifyContent="center">
        <Flex
          width="1000px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <FormControl>
            <FormLabel>Search criteria:</FormLabel>
            <Stack direction="column">
              <Stack direction="row" align="baseline">
                <Text fontSize="md" width="100px">
                  Name:
                </Text>
                <Input
                  name="name"
                  data-testid="name"
                  onChange={handleInput}
                  value={inputValue.name}
                  variant="filled"
                  background="gray.200"
                ></Input>
              </Stack>
              <Stack direction="row" align="baseline">
                <Text fontSize="md" width="100px">
                  Zip code:
                </Text>
                <Input
                  name="zip"
                  data-testid="zip"
                  onChange={handleInput}
                  value={inputValue.zip}
                  variant="filled"
                  background="gray.200"
                ></Input>
              </Stack>
              <Stack direction="row" align="baseline">
                <Text fontSize="md" width="100px">
                  Station ID:
                </Text>
                <Input
                  name="stationID"
                  data-testid="stationID"
                  onChange={handleInput}
                  value={inputValue.stationID}
                  variant="filled"
                  mb={3}
                  background="gray.200"
                ></Input>
              </Stack>
              {isInvalidSearch && (
                <Text data-testid="invalidZip" color="red" mb={3}>
                  *The criteria is too broad. Please narrow it down by filling
                  some fields*
                </Text>
              )}
            </Stack>
          </FormControl>
          <Wrap spacing="20px">
            <Button
              data-testid="searchButton"
              colorScheme="teal"
              mt={3}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Wrap>
          <FormControl mt={6}>
            <FormLabel>Search results:</FormLabel>
          </FormControl>
          {!(receivedApprovedList?.length !== 0) && (
            <Text data-testid="invalidInput" mb={3}>
              There is no user that matched the search criteria.
            </Text>
          )}
          <Accordion allowMultiple>
            {CreateAccordionItem(receivedApprovedList as any[])}
          </Accordion>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create each accordion box
  function CreateAccordionItem(jsonList: any[]) {
    const userDetails = jsonList?.map((user, index) => {
      return (
        <AccordionItem data-testid="accordion" width="container.md" key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                User #{user.userID}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} width="100%">
            <Stack direction="row" justifyContent="flex-end">
              <List marginRight="auto">
                <ListItem>
                  Name:{" "}
                  {user.firstName + " " + user.middleName + " " + user.lastName}
                </ListItem>
                <ListItem>
                  Address:{" "}
                  {user.street +
                    ", " +
                    user.city +
                    ", " +
                    user.state +
                    " " +
                    user.zip}
                </ListItem>
                <ListItem>Driver License ID: {user.driverID}</ListItem>
                <ListItem>
                  Current status: <b>{user.approvalStatus.toUpperCase()}</b>
                </ListItem>
              </List>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      );
    });
    return userDetails;
  }
}

function DecomposeJSONObject(allJson: JSON) {
  var approvedList: any[] = [];
  var jsonList: any[] = [];

  Object.keys(allJson).forEach((key) => {
    jsonList.push(allJson[key as keyof JSON]);
  });

  jsonList.forEach((user) => {
    approvedList.push(user);
  });

  jsonList = [];
  jsonList.push(approvedList);
  return jsonList;
}
