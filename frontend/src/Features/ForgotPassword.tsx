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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

export default function ForgotPanel() {
  //Alert box
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Change web title
  useEffect(() => {
    document.title = "Forgot Password - Voting System";
    setInvalidPopUp(false);
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
  const handleInput = async (e: {
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

  const [receivedAnswer, setReceivedAnswer] = React.useState("");
  const [receivedQuestion, setQuestion] = React.useState("0");
  const [isSecurityPopUp, setSecurityPopup] = React.useState(false);
  const [isInvalidCredential, setInvalidCredential] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleSend = async () => {
    let isEmailGood = false;

    //If the email is accepted, proceed to fetch the backend
    //Check if the email met all requirements
    if (inputEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")) {
      isEmailGood = true;
    } else {
      isEmailGood = false;
    }

    if (isEmailGood && !isSecurityPopUp) {
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
          console.log(data);
          if (data === "False") {
            setSecurityPopup(false);
            setInvalidCredential(true);
          } else {
            setQuestion(data[1]);
            setReceivedAnswer(data[2]);
            setSecurityPopup(true);
            setInvalidCredential(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();
  const [isValidAnswer, setValid] = React.useState(false);
  const [isInvalidPopUp, setInvalidPopUp] = React.useState(false);
  const handleVerifyAnswer = () => {
    //Check if the security answer matches the registerd answer
    if (inputAnswer === receivedAnswer) {
      setValid(true);
      setInvalidPopUp(false);
    } else {
      setValid(false);
      setInvalidPopUp(true);
    }
  };

  //Send code button listener
  const handleSendCode = async () => {
    if (isValidAnswer && isSecurityPopUp) {
      await fetch("http://localhost:5000/forgot_password/send_code", {
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
          //After sucessfully send an email, proceed to verification page
          if (data[0] === "True") {
            setAlertMessage(
              "The verification code has been sent. Proceeding to verification page..."
            );
            Navigate(true, data[1]);
          }
          //Otherwise, automatically reload the page.
          else {
            setAlertMessage(
              "There is something wrong with our system. Please wait for reloading..."
            );
            Navigate(false, "");
          }
        });
    }
  };

  //Cancel button listener
  const handleCancel = async () => {
    navigate("/login");
  };

  //DOM
  return (
    <div>
      <NavBar
        title={"Help"}
        isLoggedIn="false"
        isBlank="true"
        userName={""}
        role="voter"
      ></NavBar>
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
              verification code to change your password.
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
              disabled={isValidAnswer ? true : false}
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
              disabled={isValidAnswer ? true : false}
            ></Input>
            {isInvalidPopUp && (
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
            <Stack
              direction="column"
              style={{
                display: isValidAnswer ? "block" : "none",
              }}
            >
              <Text mb={3}>
                <b>Verification completed</b>. For extra security, please click
                the button to receive an email with a verification code.
              </Text>
              <AlertAfterCompletion></AlertAfterCompletion>
              <Button
                data-testid="sendLinkButton"
                colorScheme="teal"
                onClick={() => {
                  handleSendCode();
                  onOpen();
                }}
              >
                Send the code
              </Button>
            </Stack>
          </Wrap>
          <Wrap justify="center">
            <Text fontSize="xs" mt={6}>
              Voting System
            </Text>
          </Wrap>
        </Flex>
      </Flex>
    </div>
  );

  //Helper function to create an alert box
  function AlertAfterCompletion() {
    const cancelReference = React.useRef<HTMLButtonElement>(null);
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelReference}
          onClose={onClose}
          motionPreset="slideInBottom"
          isCentered
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody>{alertMessage}</AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  //Helper function to delay navigation
  function Delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function Navigate(isNavigate: boolean, code: string) {
    await Delay(3000);
    if (isNavigate) {
      navigate("/verification", {
        state: { user: inputEmail, code: code, requestedPage: "forgot" },
      });
    } else {
      window.location.reload();
    }
  }
}
