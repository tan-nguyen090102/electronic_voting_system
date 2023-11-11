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
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

export default function PrecinctPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Precinct - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedPrecinctList, setPrecinctList] = React.useState<Array<any>>();
  const [copyPrecinctList, setCopyPrecinctList] = React.useState<Array<any>>();
  useEffect(() => {
    fetch("http://localhost:5000/precinct")
      .then((response) => response.json())
      .then((data) => {
        setPrecinctList(data);
        setCopyPrecinctList(data);
      });
  }, []);

  //Selection listener
  const [inputSelection, setInputSelection] = React.useState("");
  const handleSelection = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputSelection(e.target.value);
  };

  //Filter button listener
  const handleFilter = () => {
    if (inputSelection !== "ALL") {
      //Filter the state by selection
      const filteredPrecinct = copyPrecinctList?.map((precinct, index) => {
        if (precinct.state === inputSelection) {
          return precinct;
        } else {
          return [];
        }
      });
      setPrecinctList(filteredPrecinct);
    } else {
      setPrecinctList(copyPrecinctList);
    }
  };

  //Add button listener
  const handleAdd = () => {};

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
      <NavBar
        title={"User Profile Request"}
        isLoggedIn="true"
        userName={user}
      ></NavBar>
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
            {CreateAccordionItem(receivedPrecinctList as any[])}
          </Accordion>
          <Button
            data-testid="addButton"
            colorScheme="teal"
            mt={3}
            onClick={handleAdd}
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
    const precinctDetails = jsonList?.map((precinct, index) => {
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
                  Station #{precinct.stationID}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} width="100%">
              <Stack direction="row" justifyContent="flex-end">
                <List marginRight="auto">
                  <ListItem>Station address: {precinct.address}</ListItem>
                  <ListItem>Head manager: {precinct.head}</ListItem>
                  <ListItem>District registered: {precinct.district}</ListItem>
                </List>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      }
    });
    return precinctDetails;
  }
}
