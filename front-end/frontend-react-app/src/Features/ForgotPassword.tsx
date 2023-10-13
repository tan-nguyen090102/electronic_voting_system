import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Input, Wrap, Text } from "@chakra-ui/react";

export default function LoginPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Forgot Password - Voting System";
  }, []);

  //Input listeners
  const [inputEmail, setInputEmail] = React.useState("");
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputEmail(e.target.value);
  };

  //Send button listener
  const navigate = useNavigate();
  const handleSend = async () => {
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
    navigate("/reset_password");
  };

  const handleCancel = async () => {
    navigate("/login");
  };

  //DOM
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Change your password</Heading>
        <Text>Let's get into your account!</Text>
        <Text mb={6}>
          First, please provide us your registered email so that we can send you
          a link to change your password.
        </Text>
        <Input
          name="email"
          data-testid="email"
          onChange={handleInput}
          value={inputEmail}
          placeholder="Email"
          variant="filled"
          mb={6}
          background="gray.200"
        ></Input>
        <Wrap spacing="20px">
          <Button
            data-testid="sendButton"
            colorScheme="teal"
            onClick={handleSend}
          >
            Send
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
      </Flex>
    </Flex>
  );
}
