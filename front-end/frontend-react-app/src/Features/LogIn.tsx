import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  Text,
  Link,
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
        userID: inputValue["userID"],
        password: inputValue["password"],
      }),
    })
      //Backend response the result back to the login
      .then((response) => response.json())
      .then((data) => {
        //Handle login
        if (data === "true") {
          navigate("/home");
        } else {
          setDecision(true);
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleSignup = async () => {
    navigate("/signup");
  };

  //Show invalid credential
  const InvalidCredit = () => {
    return (
      <>
        <Text data-testid="invalidInput" color="red" mb={3}>
          *Invalid Credential*
        </Text>
      </>
    );
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          name="userID"
          data-testid="userID"
          onChange={handleInput}
          value={inputValue["userID"]}
          placeholder="UserID"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Input
          name="password"
          data-testid="password"
          onChange={handleInput}
          value={inputValue["password"]}
          placeholder="Password"
          variant="filled"
          mb={6}
          background="gray.200"
          type="password"
        ></Input>
        {decision && <InvalidCredit></InvalidCredit>}
        <Wrap spacing="20px">
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
      </Flex>
    </Flex>
  );
}
