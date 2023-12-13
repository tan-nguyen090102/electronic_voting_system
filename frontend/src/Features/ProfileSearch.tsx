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
    firstName: "",
    lastName: "",
    zip: "",
    precinctID: "",
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
  const [receivedApprovedList, setApprovedList] = React.useState<Array<any>>(
    []
  );
  const [isInvalidSearch, setInvalidSearch] = React.useState(false);
  const handleSearch = async () => {
    let isFilled = false;

    //Check if there is at least one field filled in
    if (
      inputValue.firstName ||
      inputValue.lastName ||
      inputValue.precinctID ||
      inputValue.zip
    ) {
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
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          zip: inputValue.zip,
          precinctID: inputValue.precinctID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === "False") {
            setApprovedList([]);
          } else {
            setApprovedList(data);
          }
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
        isBlank="false"
        userName={user}
        role="admin"
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
                  First name:
                </Text>
                <Input
                  name="firstName"
                  data-testid="firstName"
                  onChange={handleInput}
                  value={inputValue.firstName}
                  variant="filled"
                  background="gray.200"
                ></Input>
              </Stack>
              <Stack direction="row" align="baseline">
                <Text fontSize="md" width="100px">
                  Last name:
                </Text>
                <Input
                  name="lastName"
                  data-testid="lastName"
                  onChange={handleInput}
                  value={inputValue.lastName}
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
                  Precinct ID:
                </Text>
                <Input
                  name="precinctID"
                  data-testid="precinctID"
                  onChange={handleInput}
                  value={inputValue.precinctID}
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
  function CreateAccordionItem(listToShown: any[]) {
    const userDetails =
      Array.isArray(listToShown) &&
      listToShown?.map((user, index) => {
        return (
          <AccordionItem
            data-testid="accordion"
            width="container.md"
            key={index}
          >
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  User #{user[10]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} width="100%">
              <Stack direction="row" justifyContent="flex-end">
                <List marginRight="auto">
                  <ListItem>
                    Full name: {user[0] + " " + user[1] + " " + user[2]}
                  </ListItem>
                  <ListItem>Date of Birth: {user[3]}</ListItem>
                  <ListItem>
                    Address:{" "}
                    {user[4] + ", " + user[5] + ", " + user[6] + " " + user[7]}
                  </ListItem>
                  <ListItem>Driver License ID: {user[8]}</ListItem>
                  <ListItem>
                    Current status: <b>{user[9].toUpperCase()}</b>
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
