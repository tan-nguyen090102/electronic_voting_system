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

  //Security question lists
  function questionListIndexing() {
    const questionList = [
      "What is your mother's hometown?",
      "What is your chilhood's name?",
      "What is your elementary school name?",
      "How many pets do you currently have?",
      "What is your grandmother's first name?",
      "What is your favorite country to visit?",
    ];

    return questionList[parseInt(receivedQuestion)];
  }

  //Input email listener
  const [inputEmail, setInputEmail] = React.useState("");
  const [isAccepted, setDecision] = React.useState(false);
  const handleInput = async (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputEmail(e.target.value);

    //Check if the email met all requirements
    if (inputEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")) {
      setDecision(true);
    } else {
      setDecision(false);
    }
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
  const [receivedAnswer, setReceivedAnswer] = React.useState("");
  const [receivedQuestion, setQuestion] = React.useState("0");
  const [isSecurityPopUp, setSecurityPopup] = React.useState(false);
  const [isInvalidCredential, setInvalidCredential] = React.useState(false);
  const handleSend = async () => {
    //If the email is accepted, proceed to fetch the backend
    if (isAccepted && !isSecurityPopUp) {
      await fetch("http://localhost:5000/forgot_password/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          email: inputEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "false") {
            setSecurityPopup(false);
            setInvalidCredential(true);
          } else {
            setQuestion(data["questionIndex"]);
            setReceivedAnswer(data["securityAnswer"]);
            setSecurityPopup(true);
            setInvalidCredential(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const [isValidAnswer, setValid] = React.useState(false);
  const handleVerifyAnswer = () => {
    //Check if the security answer matches the registerd answer
    if (inputAnswer === receivedAnswer) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSendLink = async () => {
    if (isValidAnswer && isSecurityPopUp) {
      await fetch("http://localhost:5000/forgot_password/send_email", {
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

      //navigate("/change_password");
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
          <Text mb={3}>
            First, provide us your registered email so that we can send you a
            link to change your password.
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
          {isInvalidCredential && (
            <Text data-testid="invalidInput" color="red" mb={3}>
              *Invalid Credential*
            </Text>
          )}
        </Stack>
        <Stack
          direction="column"
          style={{
            display: isSecurityPopUp ? "block" : "none",
          }}
        >
          <Text mb={3}>Please answer the security question.</Text>
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
          {!isValidAnswer && (
            <Text data-testid="invalidInput" color="red" mb={3}>
              *Invalid Credential*
            </Text>
          )}
        </Stack>
        <Wrap spacing="20px" mt={3}>
          <Button
            data-testid="sendButton"
            colorScheme="teal"
            onClick={isSecurityPopUp ? handleVerifyAnswer : handleSend}
            style={{
              display: isValidAnswer ? "none" : "block",
            }}
          >
            {isSecurityPopUp ? "Answer" : "Verify"}
          </Button>
          <Button
            data-testid="cancelButton"
            colorScheme="teal"
            variant="outline"
            onClick={handleCancel}
            style={{
              display: isValidAnswer ? "none" : "block",
            }}
          >
            Cancel
          </Button>
          <Button
            data-testid="cancelButton"
            colorScheme="teal"
            onClick={handleSendLink}
            style={{
              display: isValidAnswer ? "block" : "none",
            }}
          >
            Send the link
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
