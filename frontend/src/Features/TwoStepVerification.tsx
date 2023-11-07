import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Center,
  Text,
  Stack
} from "@chakra-ui/react";


export default function TwoStepPanel(){
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
  const handleCancel = () => {
    navigate("/login");
  };


      return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex direction="column" background="gray.100" p={12} rounded={6}>
            <Heading><Center>Enter the code</Center></Heading>
            <Center><Text mb={6}>We've sent an x-digit code to useremail@email.com.</Text>
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
          <Stack>
          <Button
           colorScheme="teal">
            Submit
            </Button>
            <Button
           colorScheme="teal"
           variant="outline"
           onClick={handleCancel}>
            Cancel
            </Button>
            </Stack>
          </Flex>
        </Flex>
      )
}
