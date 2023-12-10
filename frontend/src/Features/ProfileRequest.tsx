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
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

export default function ProfileRequestPanel() {
  const MAX_APPROVED_SHOWN = 20;
  const MAX_PENDING_INITIAL_SHOWN = [0, 1, 2];

  //Change web title
  useEffect(() => {
    document.title = "User Request - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedApprovedList, setApprovedList] = React.useState<Array<any>>(
    []
  );
  const [receivedPendingList, setPendingList] = React.useState<Array<any>>([]);
  const [receivedDeniedList, setDeniedList] = React.useState<Array<any>>([]);
  useEffect(() => {
    fetch("http://localhost:5000/requests")
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList[0]);
        setDeniedList(jsonList[1]);
        setApprovedList(jsonList[2]);
      });
  }, []);

  //Approve button listener
  const handleApprove = async (user: any, index: number) => {
    await fetch("http://localhost:5000/requests/update", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        email: user.email,
        approvalStatus: "approved",
      }),
    })
      //After sending the updated status, fetch the backend again for a new list
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList[0]);
        setDeniedList(jsonList[1]);
        setApprovedList(jsonList[2]);
      });
  };

  //Deny button listener
  const handleDeny = async (user: any, index: number) => {
    await fetch("http://localhost:5000/requests/update", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        email: user.email,
        approvalStatus: "declined",
      }),
    })
      //After sending the updated status, fetch the backend again for a new list
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList[0]);
        setDeniedList(jsonList[1]);
        setApprovedList(jsonList[2]);
      });
  };

  //DOM
  return (
    <div>
      <NavBar
        title={"User Profile Request"}
        isLoggedIn="true"
        isBlank="false"
        userName={user}
        role="admin"
      ></NavBar>
      <ListNavigationBar indexClick="6"></ListNavigationBar>
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
                Current registered voter: {receivedApprovedList?.length}
              </Text>
              <Text fontSize="md" mb={3}>
                Users to be approved: {receivedPendingList?.length}
              </Text>
            </Stack>
          </Wrap>
          <Accordion allowMultiple defaultIndex={MAX_PENDING_INITIAL_SHOWN}>
            <AccordionItem className="pendingAccordion" width="container.md">
              <h2>
                <AccordionButton data-testid="pendingButton" border="2px">
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>PENDING REQUEST ({receivedPendingList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedPendingList as any[], "pending")}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem width="container.md" className="deniedAccordion">
              <h2>
                <AccordionButton data-testid="deniedButton" border="2px">
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>DENIED REQUEST ({receivedDeniedList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedDeniedList as any[], "declined")}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem width="container.md" className="approvedAccordion">
              <h2>
                <AccordionButton data-testid="approvedButton" border="2px">
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>APPROVED REQUEST ({receivedApprovedList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedApprovedList as any[], "approved")}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create each accordion box. Approved list only shown the maximum defined
  function CreateAccordionItem(jsonList: any[], status: string) {
    const userDetails = jsonList
      ?.slice(0, status === "pending" ? jsonList.length : MAX_APPROVED_SHOWN)
      .map((user, index) => {
        return (
          <AccordionItem
            data-testid="accordion"
            width="container.md"
            key={index}
          >
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
                    {user.firstName +
                      " " +
                      user.middleName +
                      " " +
                      user.lastName}
                  </ListItem>
                  <ListItem>
                    Address:{" "}
                    {user.streetAddress +
                      ", " +
                      user.city +
                      ", " +
                      user.state +
                      " " +
                      user.zip}
                  </ListItem>
                  <ListItem>Driver License ID: {user.driverID}</ListItem>
                </List>
                <Button
                  data-testid="approveButton"
                  colorScheme="teal"
                  isDisabled={
                    user.approvalStatus === "declined" ||
                      user.approvalStatus === "approved"
                      ? true
                      : false
                  }
                  onClick={() => {
                    handleApprove(user, index);
                  }}
                >
                  Approve
                </Button>
                <Button
                  data-testid="denyButton"
                  bg="red.400"
                  isDisabled={user.approvalStatus === "declined" ? true : false}
                  onClick={() => {
                    handleDeny(user, index);
                  }}
                >
                  Deny
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      });
    return userDetails;
  }
}

function DecomposeJSONObject(jsonList: any[] = []) {
  var pendingList: any[] = [];
  var deniedList: any[] = [];
  var approvedList: any[] = [];

  Object.values(jsonList).forEach((user) => {
    if (user.approvalStatus === "pending") {
      pendingList.push(user);
    } else if (user.approvalStatus === "declined") {
      deniedList.push(user);
    } else if (user.approvalStatus === "approved") {
      approvedList.push(user);
    } else {
      return;
    }
  });

  return [pendingList, deniedList, approvedList];
}
