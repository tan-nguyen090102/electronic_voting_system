import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Wrap,
  Text,
  Stack,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

export default function ChangePasswordPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Change Password - Voting System";
  }, []);

  const { state } = useLocation();
  const { user } = state || { user: "" };

  //Input listeners
  const [inputPassword, setInputPassword] = React.useState("");
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputPassword(e.target.value);
  };

  //Password retype listener
  const [inputRetype, setRetypePass] = React.useState("");
  const handleRetypePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRetypePass(e.target.value);
  };

  //Confirm button listener
  const navigate = useNavigate();
  const [isRepeatedPopUp, setRepeatedPopUp] = React.useState(false);
  const handleConfirm = async () => {
    let isMatch = false;

    //Check if the password met all requirements
    if (inputPassword.match("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}")) {
      isMatch = true;
    }

    if (inputRetype === inputPassword && isMatch) {
      //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
      await fetch("http://localhost:5000/change_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          email: user,
          password: inputPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "False") {
            setRepeatedPopUp(true);
            return;
          }
          if (data === "True") {
            navigate("/login");
          }
        });
    }
  };

  //Cancel button listener
  const handleCancel = async () => {
    navigate("/login");
  };

  //Container for password requirements
  const requirements = (
    <>
      <Text fontSize="sm">
        {inputPassword.match("(?=.*?[A-Z])") ? "\u2713" : "\u2B24"} At least one
        uppercase letter
      </Text>
      <Text fontSize="sm">
        {inputPassword.match("(?=.*?[a-z])") ? "\u2713" : "\u2B24"} At least one
        lowercase letter
      </Text>
      <Text fontSize="sm">
        {inputPassword.match("(?=.*?[0-9])") ? "\u2713" : "\u2B24"} At least one
        digit
      </Text>
      <Text fontSize="sm">
        {inputPassword.match(".{8,}") ? "\u2713" : "\u2B24"} At least 8
        character in length
      </Text>
    </>
  );

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
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Change your password</Heading>
          <Text mb={6}>
            Please provide your new password and confirm the update.
          </Text>
          <Stack direction="row" justify="left">
            <Stack direction="column" justify="center">
              <Input
                name="password"
                data-testid="password"
                width={500}
                onChange={handleInput}
                value={inputPassword}
                placeholder="New password"
                variant="filled"
                mb={3}
                background="gray.200"
                type="password"
              ></Input>
              <Input
                name="passwordRetype"
                data-testid="passwordRetype"
                width={500}
                onChange={handleRetypePassword}
                placeholder="Confirm new password"
                variant="filled"
                mb={3}
                background="gray.200"
                type="password"
              ></Input>
              {inputRetype !== inputPassword && inputRetype.length > 0 && (
                <Text data-testid="invalidRetype" color="red" mb={3}>
                  *Your password does not match up*
                </Text>
              )}
              {isRepeatedPopUp && (
                <Text data-testid="invalidRetype" color="red" mb={3}>
                  *Your new password is the same as the old password.*
                </Text>
              )}
            </Stack>
            <Stack direction="column" justify="left" ml={70}>
              {requirements}
            </Stack>
          </Stack>
          <Wrap spacing="20px">
            <Button
              data-testid="confirmButton"
              colorScheme="teal"
              onClick={handleConfirm}
              mt={3}
            >
              Confirm
            </Button>
            <Button
              data-testid="cancelButton"
              colorScheme="teal"
              variant="outline"
              onClick={handleCancel}
              mt={3}
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
    </div>
  );
}
