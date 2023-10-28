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
} from "@chakra-ui/react";

export default function LoginPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Log In - Voting System";
  }, []);

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
            navigate("/request", { state: { user: inputValue.userID } });
          } else {
            navigate("/", {
              state: { user: inputValue.userID, isLoggedIn: "true" },
            });
          }
        } else {
          setDecision(true);
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  //Sign up button listener
  const handleSignup = async () => {
    navigate("/signup");
  };

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
    <Flex height="100vh" alignItems="center" justifyContent="center">
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
        <Wrap spacing="20px" mt={3}>
          <Button
            data-testid="loginButton"
            colorScheme="teal"
            onClick={handleLogin}
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
  );
}
