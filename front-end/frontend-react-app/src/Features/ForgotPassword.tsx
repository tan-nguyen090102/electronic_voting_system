import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Input, Wrap, Text } from "@chakra-ui/react";

export default function ForgotPanel() {
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
    let isMatch = false;

    //Check if the email met all requirements
    if (inputEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")) {
      isMatch = true;
    }

    if (isMatch) {
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

  //Show invalid email format
  const InvalidEmail = () => {
    return (
      <>
        <Text data-testid="invalidEmail" color="red" mb={3}>
          *Please use correct email format*
        </Text>
      </>
    );
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
        {!inputEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") &&
          inputEmail.length > 0 && <InvalidEmail></InvalidEmail>}
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
