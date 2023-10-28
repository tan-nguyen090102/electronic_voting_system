import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  Wrap,
  Select,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Link,
} from "@chakra-ui/react";

export default function SignUpPanel() {
  //Change web title
  useEffect(() => {
    document.title = "Sign Up - Voting System";
  }, []);

  //Sets of initial values
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    street: "",
    city: "",
    zip: "",
    email: "",
    password: "",
    phone: "",
    driverID: "",
    securityAnswer: "",
  };

  const initialSelections = {
    state: "",
    questionIndex: "0",
  };

  //Input listener
  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //Selection listener
  const [inputSelection, setInputSelection] = React.useState(initialSelections);
  const handleSelection = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputSelection({
      ...inputSelection,
      [name]: value,
    });
  };

  //Cancel button listener
  const handleCancel = () => {
    navigate("/login");
  };

  //Signup button listener
  const navigate = useNavigate();
  const [decision, setDecision] = React.useState(false);
  const handleSignup = async () => {
    let isFilled = false;
    let isMatch = false;

    //Check if all the field is filled
    if (
      inputValue.firstName &&
      inputValue.middleName &&
      inputValue.lastName &&
      inputValue.street &&
      inputValue.city &&
      inputValue.zip &&
      inputSelection.state &&
      inputValue.email &&
      inputValue.password &&
      inputValue.phone &&
      inputValue.driverID &&
      inputValue.securityAnswer
    ) {
      isFilled = true;
    }

    //Check if the password met all requirements
    if (
      inputValue.password.match("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}")
    ) {
      isMatch = true;
    }

    //Final decision
    if (inputRetype === inputValue.password && isFilled && isMatch) {
      //Stringify the value to be in JSON file for backend retrieval. Fetch should have the backend's url.
      setDecision(false);
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
          state: inputSelection["state"],
          zip: inputValue["zip"],
          email: inputValue["email"],
          password: inputValue["password"],
          phone: inputValue["phone"],
          driverID: inputValue["driverID"],
          questionIndex: inputSelection["questionIndex"],
          securityAnswer: inputValue["securityAnswer"],
          approvalStatus: "pending",
        }),
      }).catch((error) => console.log(error));
      navigate("/login");
    } else {
      setDecision(true);
    }
  };

  //Password retype listener
  const [inputRetype, setRetypePass] = React.useState("");
  const handleRetypePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRetypePass(e.target.value);
  };

  //Container for state options
  const stateOptions = (
    <>
      <option selected hidden disabled value="">
        State
      </option>
      <option value="AL">AL</option>
      <option value="AK">AK</option>
      <option value="AZ">AZ</option>
      <option value="AR">AR</option>
      <option value="CA">CA</option>
      <option value="CO">CO</option>
      <option value="CT">CT</option>
      <option value="DE">DE</option>
      <option value="FL">FL</option>
      <option value="GA">GA</option>
      <option value="HI">HI</option>
      <option value="ID">ID</option>
      <option value="IL">IL</option>
      <option value="IN">IN</option>
      <option value="IA">IA</option>
      <option value="KS">KS</option>
      <option value="KY">KY</option>
      <option value="LA">LA</option>
      <option value="ME">ME</option>
      <option value="MD">MD</option>
      <option value="MA">MA</option>
      <option value="MI">MI</option>
      <option value="MN">MN</option>
      <option value="MS">MS</option>
      <option value="MO">MO</option>
      <option value="MT">MT</option>
      <option value="NE">NE</option>
      <option value="NV">NV</option>
      <option value="NH">NH</option>
      <option value="NJ">NJ</option>
      <option value="NM">NM</option>
      <option value="NY">NY</option>
      <option value="NC">NC</option>
      <option value="ND">ND</option>
      <option value="OH">OH</option>
      <option value="OK">OK</option>
      <option value="OR">OR</option>
      <option value="PA">PA</option>
      <option value="RI">RI</option>
      <option value="SC">SC</option>
      <option value="SD">SD</option>
      <option value="TN">TN</option>
      <option value="TX">TX</option>
      <option value="UT">UT</option>
      <option value="VT">VT</option>
      <option value="VA">VA</option>
      <option value="WA">WA</option>
      <option value="WV">WV</option>
      <option value="WI">WI</option>
      <option value="WY">WY</option>
    </>
  );

  //Container for security questions
  const questionOptions = (
    <>
      <option value="0">What is your mother's hometown?</option>
      <option value="1">What is your chilhood's name?</option>
      <option value="2">What is your elementary school name?</option>
      <option value="3">How many pets do you currently have?</option>
      <option value="4">What is your grandmotherr's first name?</option>
      <option value="5">What is your favorite country to visit?</option>
    </>
  );

  //Container for password requirements
  const requirements = (
    <>
      <Text fontSize="sm">
        {inputValue.password.match("(?=.*?[A-Z])") ? "\u2713" : "\u2B24"} At
        least one uppercase letter
      </Text>
      <Text fontSize="sm">
        {inputValue.password.match("(?=.*?[a-z])") ? "\u2713" : "\u2B24"} At
        least one lowercase letter
      </Text>
      <Text fontSize="sm">
        {inputValue.password.match("(?=.*?[0-9])") ? "\u2713" : "\u2B24"} At
        least one digit
      </Text>
      <Text fontSize="sm">
        {inputValue.password.match(".{8,}") ? "\u2713" : "\u2B24"} At least 8
        character in length
      </Text>
    </>
  );

  //DOM
  return (
    <Flex height="auto" alignItems="left" justifyContent="center">
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
          <FormControl isRequired>
            <FormLabel>Name and Address: </FormLabel>
            <Input
              name="firstName"
              data-testid="firstName"
              onChange={handleInput}
              value={inputValue["firstName"]}
              placeholder="First Name"
              variant="filled"
              mb={3}
              background="gray.200"
              required
            ></Input>
            <Input
              name="middleName"
              data-testid="middleName"
              onChange={handleInput}
              value={inputValue["middleName"]}
              placeholder="Middle Name"
              variant="filled"
              mb={3}
              background="gray.200"
            ></Input>
            <Input
              name="lastName"
              data-testid="lastName"
              onChange={handleInput}
              value={inputValue["lastName"]}
              placeholder="Last Name"
              variant="filled"
              mb={3}
              background="gray.200"
            ></Input>
            <Stack direction="row">
              <Input
                name="street"
                data-testid="street"
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
                data-testid="city"
                width={200}
                onChange={handleInput}
                value={inputValue["city"]}
                placeholder="City"
                variant="filled"
                mb={3}
                background="gray.200"
              ></Input>
              <Select
                name="state"
                data-testid="state"
                width={24}
                borderWidth={2}
                onChange={handleSelection}
              >
                {stateOptions}
              </Select>
              <Input
                name="zip"
                data-testid="zip"
                width={100}
                onChange={handleInput}
                value={inputValue["zip"]}
                placeholder="Zip Code"
                variant="filled"
                mb={3}
                background="gray.200"
              ></Input>
            </Stack>
            {!inputValue.zip.match("^[0-9]{0,5}$") &&
              inputValue.zip.length > 0 && (
                <Text data-testid="invalidZip" color="red" mb={3}>
                  *Please enter correct zip code format (0-9)*
                </Text>
              )}
          </FormControl>
          <Stack justify="left">
            <FormControl isRequired>
              <FormLabel>Username and Password:</FormLabel>
              <Stack direction="row">
                <Input
                  name="email"
                  data-testid="email"
                  width={500}
                  onChange={handleInput}
                  value={inputValue["email"]}
                  placeholder="Email"
                  variant="filled"
                  mb={3}
                  background="gray.200"
                ></Input>
                {!inputValue.email.match(
                  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
                ) &&
                  inputValue.email.length > 0 && (
                    <Text
                      data-testid="invalidEmail"
                      color="red"
                      mb={3}
                      ml={50}
                      mt={3}
                    >
                      *Please use correct email format*
                    </Text>
                  )}
              </Stack>
              <Stack direction="row" justify="left">
                <Stack direction="column" justify="center">
                  <Input
                    name="password"
                    data-testid="password"
                    width={500}
                    onChange={handleInput}
                    value={inputValue["password"]}
                    placeholder="Password"
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
                    placeholder="Confirm password"
                    variant="filled"
                    mb={3}
                    background="gray.200"
                    type="password"
                  ></Input>
                  {inputRetype !== inputValue.password &&
                    inputRetype.length > 0 && (
                      <Text data-testid="invalidRetype" color="red" mb={3}>
                        *Your password does not match up*
                      </Text>
                    )}
                </Stack>
                <Stack direction="column" justify="left" ml={70}>
                  {requirements}
                </Stack>
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Additional Verifications:</FormLabel>
              <Stack direction="row">
                <Input
                  name="phone"
                  data-testid="phone"
                  width={412}
                  onChange={handleInput}
                  value={inputValue["phone"]}
                  placeholder="Phone Number"
                  variant="filled"
                  mb={3}
                  background="gray.200"
                ></Input>
                <Input
                  name="driverID"
                  data-testid="driverID"
                  width={412}
                  onChange={handleInput}
                  value={inputValue["driverID"]}
                  placeholder="Driver License ID"
                  variant="filled"
                  mb={6}
                  background="gray.200"
                ></Input>
              </Stack>
              {!inputValue.phone.match("^[0-9]{0,15}$") &&
                inputValue.phone.length > 0 && (
                  <Text data-testid="invalidPhone" color="red" mb={3}>
                    *Please use correct phone number format (0-9)*
                  </Text>
                )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Security Questions:</FormLabel>
              <Stack direction="column">
                <Select
                  name="questionIndex"
                  data-testid="question"
                  borderWidth={2}
                  onChange={handleSelection}
                  defaultValue="0"
                  value={inputSelection["questionIndex"]}
                >
                  {questionOptions}
                </Select>
                <Input
                  name="securityAnswer"
                  data-testid="securityAnswer"
                  onChange={handleInput}
                  value={inputValue["securityAnswer"]}
                  placeholder="Answer"
                  variant="filled"
                  mb={6}
                  background="gray.200"
                ></Input>
                {decision && (
                  <Text data-testid="unfilledFields" color="red" mb={3}>
                    *Please fill out all required fields*
                  </Text>
                )}
              </Stack>
            </FormControl>
          </Stack>
        </Wrap>
        <Wrap spacing="20px">
          <Button
            data-testid="signupButton"
            colorScheme="teal"
            onClick={handleSignup}
          >
            Sign Up
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
        <Link
          href="/admin_verification"
          color="blue"
          mt={6}
          onChange={handleSignup}
        >
          Sign up as Manager/Administrator of Voting System
        </Link>
        <Text fontSize="xs" mt={6}>
          Voting System
        </Text>
      </Flex>
    </Flex>
  );
}
