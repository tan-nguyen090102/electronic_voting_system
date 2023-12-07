import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Heading,
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";
import NavBar, { ListNavigationBarVoter } from "./NavBar";

export default function BallotPage() {
  useEffect(() => {
    document.title = "Ballot - Voting System";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  return (
    <div>
      <NavBar
        title={"My Ballot"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="voter"
      ></NavBar>
      <ListNavigationBarVoter
        indexClick="1"
        isLoggedIn="true"
      ></ListNavigationBarVoter>
      <Flex height="auto" alignItems="left" justifyContent="center">
        <Flex
          width="2000 px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <Accordion allowMultiple>{CreateAccordionItem(["1", "2"])}</Accordion>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create each accordion box
  function CreateAccordionItem(listToShown: any[]) {
    const electionDetails =
      Array.isArray(listToShown) &&
      listToShown.map((election, index) => {
        return (
          <AccordionItem
            data-testid="accordion"
            width="container.md"
            key={index}
          >
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {election[1]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} width="100%">
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
                {CreateRaceCards(["1", "2"])}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        );
      });
    return electionDetails;
  }

  //Helper function to create electoral race cards
  function CreateRaceCards(listToShown: any[] = ["1", "2"]) {
    const raceDetails =
      Array.isArray(listToShown) &&
      listToShown.map((race, index) => {
        return (
          <Card>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <p>View a summary of all your customers over the last month.</p>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        );
      });

    return raceDetails;
  }
}
