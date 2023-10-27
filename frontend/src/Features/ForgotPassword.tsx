import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  Text,
  Stack,
  Select,
} from "@chakra-ui/react";

export default function ForgotPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Forgot Password - Voting System";
  }, []);

  //Backend response the security question and answer back to the panel
  const [receivedAnswer, setReceivedAnswer] = React.useState("");
  const [receivedQuestion, setQuestion] = React.useState("0");
  useEffect(() => {
    fetch("http://localhost:5000/forgot_password")
      .then((response) => response.json())
      .then((data) => {
        setReceivedAnswer(data["securityAnswer"]);
        setQuestion(data["questionIndex"]);
      });
  }, []);

  //Security question lists
  function questionListIndexing() {
    const questionList = [
      "What is your mother's hometown?",
      "What is your chilhood's name?",
      "What is your elementary school name?",
      "How many pets do you currently have?",
      "What is your grandmotherr's first name?",
      "What is your favorite country to visit?",
    ];

    return questionList[parseInt(receivedQuestion)];
  }

  //Input email listener
  const [inputEmail, setInputEmail] = React.useState("");
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputEmail(e.target.value);
  };

  //Input answer listener
  const [inputAnswer, setInputAnswer] = React.useState("");
  const handleAnswer = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputAnswer(e.target.value);
  };

  //Send button listener
  const navigate = useNavigate();
  const [isInvalidPopUp, setPopUp] = React.useState(false);
  const [isAccepted, setDecision] = React.useState(false);
  const [isEmailPopUp, setEmailPopup] = React.useState(false);
  const handleSend = async () => {
    let isMatch = false;

    //Check if the person has answer the security question
    if (inputEmail !== "") {
      //Check if the email met all requirements
      if (inputEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")) {
        isMatch = true;
        setDecision(true);
      }
    } else {
      if (inputAnswer === receivedAnswer) {
        setEmailPopup(true);
        setPopUp(false);
      } else {
        setEmailPopup(false);
        setPopUp(true);
      }
    }

    if (isMatch && !isAccepted) {
      //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
      await fetch("http://localhost:5000/forgot_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          email: inputEmail,
        }),
      });
      navigate("/change_password");
    }
  };

  //Cancel button listener
  const handleCancel = async () => {
    navigate("/login");
  };

  //DOM
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        width="100vh"
        direction="column"
        background="gray.100"
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Change your password</Heading>
        <Stack direction="column">
          <Text>Let's get into your account!</Text>
          <Text mb={3}>First, please answer the security question.</Text>
          <Select borderWidth={3}>
            <option value="0">{questionListIndexing()}</option>
          </Select>
          <Input
            name="securityAnswer"
            data-testid="securityAnswer"
            onChange={handleAnswer}
            value={inputAnswer}
            placeholder="Answer"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
          {isInvalidPopUp && (
            <Text data-testid="invalidInput" color="red" mb={3}>
              *Invalid Credential*
            </Text>
          )}
        </Stack>
        <Stack
          direction="column"
          style={{
            display: isEmailPopUp ? "block" : "none",
          }}
        >
          <Text mb={3}>
            Provide us your registered email so that we can send you a link to
            change your password.
          </Text>
          <Input
            name="email"
            data-testid="email"
            onChange={handleInput}
            value={inputEmail}
            placeholder="Email"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
          {!inputEmail.match(
            "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
          ) &&
            inputEmail.length > 0 && (
              <Text data-testid="invalidEmail" color="red" mb={3}>
                *Please use correct email format*
              </Text>
            )}
        </Stack>
        <Wrap spacing="20px" mt={3}>
          <Button
            data-testid="sendButton"
            colorScheme="teal"
            onClick={handleSend}
          >
            {isEmailPopUp ? "Send" : "Answer"}
          </Button>
          <Button
            data-testid="cancelButton"
            colorScheme="teal"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Wrap>
        <Wrap justify="center">
          <Text fontSize="xs" mt={6}>
            Voting System
          </Text>
        </Wrap>
      </Flex>
    </Flex>
  );
}
