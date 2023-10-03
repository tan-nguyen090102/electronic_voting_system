import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Input, Button, Wrap, Select } from "@chakra-ui/react";

export default function SignUpPanel() {
  useEffect(() => {
    document.title = "Sign Up - Voting System";
  }, []);

  const initialValues = {
    ID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    driverID: "",
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

  //Cancel button listener
  const handleCancel = () => {
    navigate("/login");
  };

  //Backend response the last ID back to the signup
  useEffect(() => {
    fetch("http://localhost:5000/signup")
      .then((response) => response.json())
      .then((data) => {
        setInputValue(data);
        console.log(data);
      });
  }, []);

  //Signup button listener
  const navigate = useNavigate();
  const handleSignup = async () => {
    //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        firstName: inputValue["firstName"],
        middleName: inputValue["middleName"],
        lastName: inputValue["lastName"],
        street: inputValue["street"],
        city: inputValue["city"],
        state: inputValue["state"],
        zip: inputValue["zip"],
        email: inputValue["email"],
        phone: inputValue["phone"],
        driverID: inputValue["driverID"],
        ID: inputValue["ID"],
      }),
    }).catch((error) => console.log(error));

    navigate("/login");
  };

  //Container for state options
  const stateOption = (
    <>
      <option selected hidden disabled value="">
        State
      </option>
      <option value="AL">AL</option>
      <option value={inputValue["state"]}>AK</option>
      <option value={inputValue["state"]}>AZ</option>
      <option value={inputValue["state"]}>AR</option>
      <option value={inputValue["state"]}>CA</option>
      <option value={inputValue["state"]}>CO</option>
      <option value={inputValue["state"]}>CT</option>
      <option value={inputValue["state"]}>DE</option>
      <option value={inputValue["state"]}>FL</option>
      <option value={inputValue["state"]}>GA</option>
      <option value={inputValue["state"]}>HI</option>
      <option value={inputValue["state"]}>ID</option>
      <option value={inputValue["state"]}>IL</option>
      <option value={inputValue["state"]}>IN</option>
      <option value={inputValue["state"]}>IA</option>
      <option value={inputValue["state"]}>KS</option>
      <option value={inputValue["state"]}>KY</option>
      <option value={inputValue["state"]}>LA</option>
      <option value={inputValue["state"]}>ME</option>
      <option value={inputValue["state"]}>MD</option>
      <option value={inputValue["state"]}>MA</option>
      <option value={inputValue["state"]}>MI</option>
      <option value={inputValue["state"]}>MN</option>
      <option value={inputValue["state"]}>MS</option>
      <option value={inputValue["state"]}>MO</option>
      <option value={inputValue["state"]}>MT</option>
      <option value={inputValue["state"]}>NE</option>
      <option value={inputValue["state"]}>NV</option>
      <option value={inputValue["state"]}>NH</option>
      <option value={inputValue["state"]}>NJ</option>
      <option value={inputValue["state"]}>NM</option>
      <option value={inputValue["state"]}>NY</option>
      <option value={inputValue["state"]}>NC</option>
      <option value={inputValue["state"]}>ND</option>
      <option value={inputValue["state"]}>OH</option>
      <option value={inputValue["state"]}>OK</option>
      <option value={inputValue["state"]}>OR</option>
      <option value={inputValue["state"]}>PA</option>
      <option value={inputValue["state"]}>RI</option>
      <option value={inputValue["state"]}>SC</option>
      <option value={inputValue["state"]}>SD</option>
      <option value={inputValue["state"]}>TN</option>
      <option value={inputValue["state"]}>TX</option>
      <option value={inputValue["state"]}>UT</option>
      <option value={inputValue["state"]}>VT</option>
      <option value={inputValue["state"]}>VA</option>
      <option value={inputValue["state"]}>WA</option>
      <option value={inputValue["state"]}>WV</option>
      <option value={inputValue["state"]}>WI</option>
      <option value={inputValue["state"]}>WY</option>
    </>
  );

  return (
    <Flex height="70vh" alignItems="left" justifyContent="center">
      <Flex
        width="1000px"
        alignItems="center"
        direction="column"
        background="gray.100"
        p={10}
        rounded={6}
      >
        <Heading mb={6}>Sign up for Voting</Heading>
        <Wrap>
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
            name="street"
            width={500}
            onChange={handleInput}
            value={inputValue["street"]}
            placeholder="Street"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
          <Input
            name="city"
            width={200}
            onChange={handleInput}
            value={inputValue["city"]}
            placeholder="City"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
          <Select name="stateSelect" width={24} borderWidth={2}>
            {stateOption}
          </Select>
          <Input
            name="zip"
            width={100}
            onChange={handleInput}
            value={inputValue["zip"]}
            placeholder="Zip Code"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
        </Wrap>
        <Wrap justify="start" mt={2}>
          <Input
            name="email"
            width={500}
            onChange={handleInput}
            value={inputValue["email"]}
            placeholder="Email"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
          <Input
            name="phone"
            width={412}
            onChange={handleInput}
            value={inputValue["phone"]}
            placeholder="Phone Number"
            variant="filled"
            mb={3}
            background="gray.200"
          ></Input>
        </Wrap>
        <Wrap spacing="20px">
          <Button colorScheme="teal" onClick={handleSignup}>
            Sign Up
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </Wrap>
      </Flex>
    </Flex>
  );
}
