import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Heading, Input, Wrap } from "@chakra-ui/react";

export default function LoginPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Log In - Voting System";
  }, []);

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
  const [decision, setDecision] = React.useState("");
  const handleClick = async () => {
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
        setDecision(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          name="userID"
          onChange={handleInput}
          value={inputValue["userID"]}
          placeholder="UserID"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Input
          name="password"
          onChange={handleInput}
          value={inputValue["password"]}
          placeholder="Password"
          variant="filled"
          mb={6}
          background="gray.200"
          type="password"
        ></Input>
        <Wrap spacing="20px">
          <Link reloadDocument to={decision === "true" ? "/home" : "/login"}>
            <Button colorScheme="teal" onClick={handleClick}>
              Login
            </Button>
          </Link>
          <Link reloadDocument to="/signup">
            <Button colorScheme="teal" variant="outline">
              Sign Up
            </Button>
          </Link>
        </Wrap>
      </Flex>
    </Flex>
  );
}
