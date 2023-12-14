import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  Text,
  Link,
  Stack,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

export default function LoginPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Log In - Voting System";
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  //Input initial values
  const initialValues = {
    userID: "",
    password: "",
    role: "",
    employeeID: "",
  };

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //Selection listener
  const [inputSelection, setInputSelection] = React.useState("voter");
  const [isPopUp, setPopUp] = React.useState(false);
  const handleSelection = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputSelection(e.target.value);

    //Check the role for third input popup
    if (e.target.value === "manager" || e.target.value === "admin") {
      setPopUp(true);
    } else {
      setPopUp(false);
    }
  };

  //Login button listener
  const navigate = useNavigate();
  const [decision, setDecision] = React.useState(false);
  const handleLogin = async () => {
    //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        userID: inputValue.userID,
        password: inputValue.password,
        role: inputSelection,
        employeeID: inputValue.employeeID,
      }),
    })
      //Backend response the result back to the login
      .then((response) => response.json())
      .then((data) => {
        //Handle login
        if (data === "true") {
          if (inputSelection === "admin") {
            //handleSendCode("/requests")
            navigate("/requests", { state: { user: inputValue.userID } });
          } else if (inputSelection === "manager") {
            //handleSendCode("/dashboard_manager")
            navigate("/dashboard_manager", {
              state: { user: inputValue.userID, isLoggedIn: "true" },
            });
          } else {
            onOpen();
            handleSendCode("/")
          }
        } else {
          setDecision(true);
        }
      })
      .catch((error) => console.log(error));
  };

  //Sign up button listener
  const handleSignup = async () => {
    navigate("/signup");
  };

   //Send code button listener
   const [alertMessage, setAlertMessage] = React.useState("");
   const handleSendCode = async (linkPath: string) => {
    await fetch("http://localhost:5000/forgot_password/send_code", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          email: inputValue.userID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //After sucessfully send an email, proceed to verification page
          if (data[0] === "True") {
            setAlertMessage(
              "The verification code has been sent. Proceeding to verification page..."
            );
            Navigate(true, data[1], linkPath);
          }
          //Otherwise, automatically reload the page.
          else {
            setAlertMessage(
              "There is something wrong with our system. Please wait for reloading..."
            );
            Navigate(false, "", linkPath);
          }
        });
    }

  //Container for role options
  const roleOptions = (
    <>
      <option value="voter">Voter</option>
      <option value="manager">Manager</option>
      <option value="admin">Administrator</option>
    </>
  );

  //DOM
  return (
    <div>
      <NavBar
        title={"Login"}
        isLoggedIn="false"
        isBlank="true"
        userName={""}
        role="voter"
      ></NavBar>
      <Flex height="75vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Stack direction="row" justify="left">
            <Heading mb={6}>Login</Heading>
            <Heading>as: </Heading>
            <Select
              name="role"
              data-testid="role"
              borderWidth={3}
              onChange={handleSelection}
              defaultValue="voter"
            >
              {roleOptions}
            </Select>
          </Stack>
          <Stack direction="column" justify="center">
            <Input
              name="userID"
              data-testid="userID"
              onChange={handleInput}
              value={inputValue.userID}
              placeholder="Email"
              variant="filled"
              mb={3}
              background="gray.200"
            ></Input>
            <Input
              name="password"
              data-testid="password"
              onChange={handleInput}
              value={inputValue.password}
              placeholder="Password"
              variant="filled"
              mb={3}
              background="gray.200"
              type="password"
            ></Input>
            <Input
              name="employeeID"
              data-testid="employeeID"
              onChange={handleInput}
              value={inputValue["employeeID"]}
              placeholder="VS-ID"
              variant="filled"
              mb={3}
              background="gray.200"
              style={{ display: isPopUp ? "block" : "none" }}
            ></Input>
            {decision && (
              <Text data-testid="invalidInput" color="red" mb={3}>
                *Invalid Credential*
              </Text>
            )}
          </Stack>
          <AlertAfterCompletion></AlertAfterCompletion>
          <Wrap spacing="20px" mt={3}>
            <Button
              data-testid="loginButton"
              colorScheme="teal"
              onClick={ () => { 
                handleLogin();
                 }}
            >
              Login
            </Button>
            <Button
              data-testid="signupButton"
              colorScheme="teal"
              variant="outline"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Wrap>
          <Link href="/forgot_password" color="blue" mt={6}>
            Forgot your Password?
          </Link>
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
  
    async function Navigate(isNavigate: boolean, code: string, linkPath: string) {
      await Delay(3000);
      if (isNavigate) {
        navigate("/verification", { state: { user: inputValue.userID, code: code, requestedPage: "login", linkPath: linkPath } });
      } else {
        window.location.reload();
      }
    }
}
