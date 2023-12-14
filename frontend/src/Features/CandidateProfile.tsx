import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Flex, Text, Stack, Heading } from "@chakra-ui/react";
import NavBar, { ListNavigationBarVoter } from "./NavBar";

export default function CandidateProfilePanel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || { user: "" };
  const { candidate } = state || { candidate: "" };

  useEffect(() => {
    document.title = "Candidate Profile - Voting System";
  }, []);

  const [receivedCandidateInfo, setCandidateListInfo] = React.useState<
    Array<any>
  >([]);
  useEffect(() => {
    fetch("http://localhost:5000/candidate_voter", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        candidate: candidate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCandidateListInfo(data);
        } else {
          setCandidateListInfo([]);
        }
      });
  }, [candidate]);

  return (
    <div>
      <NavBar
        isBlank="false"
        title={"Candidate Profile"}
        isLoggedIn="true"
        userName={user}
        role="voter"
      ></NavBar>
      <ListNavigationBarVoter
        indexClick="3"
        isLoggedIn="true"
      ></ListNavigationBarVoter>

      <Flex height="auto" alignItems="left" justifyContent="center">
        <Flex
          width="1000px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <Heading mb={6}>
            Candidate: {receivedCandidateInfo[1]} {receivedCandidateInfo[2]}
          </Heading>
          <Stack>
            <Text>
              <b>First Name:</b> {receivedCandidateInfo[1]}{" "}
            </Text>
            <Text>
              <b>Last Name:</b> {receivedCandidateInfo[2]}{" "}
            </Text>
            <Text>
              <b>Date of Birth:</b> {receivedCandidateInfo[3]}{" "}
            </Text>
            <Text>
              <b>Geographic ID:</b> {receivedCandidateInfo[4]}{" "}
            </Text>
            <Button
              data-testid="returnButton"
              colorScheme="teal"
              width="300px"
              variant="outline"
              mt={3}
              onClick={() => {
                navigate("/ballot_voter", { state: { user: user } });
              }}
            >
              Return to Ballot
            </Button>
          </Stack>
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
