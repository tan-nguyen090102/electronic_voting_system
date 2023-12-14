import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Center,
  Text,
  Stack,
  Wrap
} from "@chakra-ui/react";
import NavBar from "./NavBar";


export default function TwoStepPanel(){

  const { state } = useLocation();
  const { user, code, requestedPage, linkPath } = state || { user: "", code: "", requestedPage: "", linkPath: "" };

  const [isErrorPopUp, setErrorPopUp] = React.useState(false);

    useEffect(() => {
        document.title = "Verification - Voting System";
      }, []);

      const initialValues = {
        code: ""
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

  const navigate = useNavigate();

  const handleCheck = () =>{
    if (inputValue.code === code){
      setErrorPopUp(false)
      if (requestedPage === "forgot"){
        navigate("/change_password", { state: { user: user }})
      }
      else if (requestedPage === "login"){
        navigate(linkPath, { state: { user: user, isLoggedIn: "true" }})
      }
    }
    else {
      setErrorPopUp(true)
    }
  }

  const handleCancel = () => {
    navigate("/login");
  };


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
            <Heading><Center>Enter the code</Center></Heading>
            <Center><Text mb={6}>We've sent a 6-digit code to {user}.</Text>
            </Center>
            <Input
            name="code"
            data-testid="code"
            onChange={handleInput}
            value={inputValue.code}
            placeholder="Code"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
            {isErrorPopUp && (
            <Text data-testid="invalidInput" color="red" mb={3}>
                *Invalid Code*
            </Text>
            )}
          <Stack>
          <Button
           colorScheme="teal"
           onClick={handleCheck}>
            Submit
            </Button>
            <Button
           colorScheme="teal"
           variant="outline"
           onClick={handleCancel}>
            Cancel
            </Button>
            </Stack>
            <Wrap justify="center">
            <Text fontSize="xs" mt={6}>
              Voting System
            </Text>
          </Wrap>
          </Flex>
        </Flex>
        </div>
      )
}
