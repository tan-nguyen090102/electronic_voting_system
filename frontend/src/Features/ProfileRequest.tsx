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
  Text
} from "@chakra-ui/react";
import NavBar, { ListNavigationBar } from "./NavBar";

export default function ProfileRequestPanel() {
  //Change web title
  useEffect(() => {
    document.title = "User Request - Voting System Administrator";
  }, []);

  //Receive data from other page.
  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Retrieve the list of all user to the page
  const [receivedApprovedList, setApprovedList] = React.useState<Array<any>>();
  const [receivedPendingList, setPendingList] = React.useState<Array<any>>();
  const [receivedDeniedList, setDeniedList] = React.useState<Array<any>>();
  useEffect(() => {
    fetch("http://localhost:5000/request")
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList.pop());
        setDeniedList(jsonList.pop());
        setApprovedList(jsonList.pop());
      });
  }, []);

  //Approve button listener
  const handleApprove = async (user: any, index: number) => {
    await fetch("http://localhost:5000/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        userID: user.userID,
        approvalStatus: "approved",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList.pop());
        setDeniedList(jsonList.pop());
        setApprovedList(jsonList.pop());
      });
  };

  //Deny button listener
  const handleDeny = async (user: any, index: number) => {
    await fetch("http://localhost:5000/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        userID: user.userID,
        approvalStatus: "denied",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        var jsonList = DecomposeJSONObject(data);
        setPendingList(jsonList.pop());
        setDeniedList(jsonList.pop());
        setApprovedList(jsonList.pop());
      });
  };

  //DOM
  return (
    <div>
      <NavBar
        title={"User Profile Request"}
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
          <Accordion allowMultiple>
            <AccordionItem data-testid="pending-accordion" width="container.md">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>PENDING REQUEST ({receivedPendingList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedPendingList as any[])}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem width="container.md">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>DENIED REQUEST ({receivedDeniedList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedDeniedList as any[])}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem width="container.md">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" textStyle="bold">
                    <b>APPROVED REQUEST ({receivedApprovedList?.length})</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} width="100%">
                {CreateAccordionItem(receivedApprovedList as any[])}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create each accordion box
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
              </List>
              <Button
                data-testid="approveButton"
                bg="teal.400"
                isDisabled={
                  user.approvalStatus === "denied" ||
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
                isDisabled={user.approvalStatus === "denied" ? true : false}
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

function DecomposeJSONObject(allJson: JSON) {
  var pendingList: any[] = [];
  var deniedList: any[] = [];
  var approvedList: any[] = [];
  var jsonList: any[] = [];

  Object.keys(allJson).forEach((key) => {
    jsonList.push(allJson[key as keyof JSON]);
  });

  jsonList.forEach((user) => {
    if (user.approvalStatus === "pending") {
      pendingList.push(user);
    }
    if (user.approvalStatus === "denied") {
      deniedList.push(user);
    }
    if (user.approvalStatus === "approved") {
      approvedList.push(user);
    }
  });

  jsonList = [];
  jsonList.push(approvedList);
  jsonList.push(deniedList);
  jsonList.push(pendingList);
  return jsonList;
}
