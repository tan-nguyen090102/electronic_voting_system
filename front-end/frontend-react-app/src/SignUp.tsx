import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Heading, Input, Button, Wrap } from "@chakra-ui/react";

export default function SignUpPanel() {
  useEffect(() => {
    document.title = "Sign Up - Voting System";
  }, []);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
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
  const handleClick = () => {};

  return (
    <Flex height="70vh" alignItems="center" justifyContent="center">
      <Flex
        width="1000px"
        alignItems="center"
        direction="column"
        background="gray.100"
        p={10}
        rounded={6}
      >
        <Heading mb={6}>Sign up for Voting</Heading>
        <Input
          name="firstName"
          onChange={handleInput}
          value={inputValue["firstName"]}
          placeholder="First Name"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Input
          name="middleName"
          onChange={handleInput}
          value={inputValue["middleName"]}
          placeholder="Middle Name"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Input
          name="lastName"
          onChange={handleInput}
          value={inputValue["lastName"]}
          placeholder="Last Name"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Input
          name="address"
          onChange={handleInput}
          value={inputValue["address"]}
          placeholder="Address"
          variant="filled"
          mb={3}
          background="gray.200"
        ></Input>
        <Wrap spacing="20px">
          <Link reloadDocument to="/">
            <Button colorScheme="teal" onClick={handleClick}>
              Sign Up
            </Button>
          </Link>
          <Link reloadDocument to="/">
            <Button colorScheme="teal" variant="outline">
              Cancel
            </Button>
          </Link>
        </Wrap>
      </Flex>
    </Flex>
  );
}
