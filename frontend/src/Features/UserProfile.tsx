import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Input,
  Text,
  Stack,
  Select,
  Link,
  useToast
} from "@chakra-ui/react";
import NavBar from "./NavBar";

/* Request help with: the whole foreign key debacle with zips
State selection not resetting when returning to initial values
*/

export default function UserProfilePanel(){

  useEffect(() => {
    document.title = "User Profile - Voting System";
  }, []);

  const { state } = useLocation();
  const { user } = state || { user: "" };
  const addToast = useToast();
  const navigate = useNavigate();

  const [oldEmail, setOldEmail] = React.useState("");
  const [oldZip, setOldZip] = React.useState("");
  const [oldState, setOldState] = React.useState("")
  const [oldCity, setOldCity] = React.useState("")
  const [userProfile, setUserProfile] = React.useState<Array<any>>([]);
  const [isEditable, setEditable] = React.useState(false);
  const [isStateChanged, setStateChanged] = React.useState(false);
  const [isCorrect, setCorrect] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isZipChange, setZipChange] = React.useState(false);
  const [isCityChanged, setCityChange] = React.useState(false);
  const [isEmailChanged, setEmailChange] = React.useState(false);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    street: "",
    city: "",
    zip: "",
    email: "",
        passport: "",
    driverID: "",
      };

  const initialSelections = {
    state: ""
  };

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

  // Get user info from backend 
  useEffect(() => {
    fetch("http://localhost:5000/user_profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        user: user
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data)
setOldEmail(data[4])
        setOldZip(data[7])
        setOldState(data[9])
        setOldCity(data[8])
        initialValues.firstName = data[0]
        initialValues.middleName = data[1]
        initialValues.lastName = data[2]
        initialValues.street = data[3]
        initialValues.email = data[4]
        initialValues.driverID = data[5]
        initialValues.passport = data[6]
        initialValues.zip = data[7].substring(0,5)
        initialValues.city = data[8]
        initialSelections.state = data[9]
      });
console.log(initialValues.email)
  }, []);

  console.log(userProfile);


        //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e: { target: { name: any; value: any } }) => {
  const { name, value } = e.target;
  if (name === "city"){
    setCityChange(true)
    setCorrect(false)
    if (value === oldCity){
      setCityChange(false)
      setCorrect(true)
    }
  }
  if (name === "zip"){
    if (value !== oldZip.substring(0,5)){
      setZipChange(true)
      setCorrect(true)
    }
    else{
      setZipChange(false)
      if (isStateChanged === true || isCityChanged === true){
        setCorrect(false)
      }
    }
  }
  if (name === "email"){
    setEmailChange(true)
    if (value === oldEmail){
      setEmailChange(false)
    }
  }
  if (value.length === 0){
    setIsEmpty(true)
  }
  else{
    setIsEmpty(false)
  }
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
    setStateChanged(true);
setCorrect(false);
    if (value === oldState){
      setStateChanged(false);
      setCorrect(true);
    }
  };

  const handleEdit = () => {
    setEditable(true)
  }

const [decision, setDecision] = React.useState(false);
  const handleSave = () =>{
    let isFilled = false;
let isSatisfied = false;
    console.log(initialValues.email)

    if (
      inputValue.firstName &&
      inputValue.middleName &&
      inputValue.lastName &&
      inputValue.street &&
      inputValue.city &&
      inputValue.zip &&
      inputSelection.state &&
      inputValue.email 
    ) {
      isFilled = true;
    }

    if (isStateChanged === true){
      if (isZipChange === true){
      isSatisfied = true;
      }
      else{
        isSatisfied = false;
      }
    }
    else{
      isSatisfied = true;
      }
      if (isFilled && isSatisfied && inputValue.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") && 
      inputValue.email.length > 0){
        setEditable(false);
        //Send updated user info to backend
        fetch("http://localhost:5000/user_profile/update", {
          method: "POST",
          headers: {
           Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
          body: JSON.stringify({
            firstName: inputValue.firstName,
            middleName: inputValue.middleName,
            lastName: inputValue.lastName,
            email: inputValue.email,
            street: inputValue.street,
            city: inputValue.city,
            zip: isZipChange ? inputValue.zip : oldZip,
            state: inputSelection.state,
            oldEmail: oldEmail,
            oldZip: oldZip,
          }),
        })
      if (isEmailChanged === true){
          navigate("/login");
        }

        addToast({
          title: "Updated!",
          description: `Your profile has been updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });  
    }
  }

  const handleClose = () =>{
    setEditable(false)
setInputValue({ firstName : userProfile[0],
    middleName : userProfile[1], 
    lastName : userProfile[2],
    street : userProfile[3],
    city : userProfile[8],
    zip : oldZip.substring(0,5),
    email : userProfile[4],
    driverID : userProfile[5],
    passport : userProfile [6] })
    setInputSelection({ state: oldState })
  }

  return( 
    <div>
        <NavBar isBlank="false" title={"User Profile"} isLoggedIn="true" userName={user} role="voter"></NavBar>
      
        <Flex height="auto" alignItems="left" justifyContent="center">
        <Flex
          width="1000px"
          alignItems="center"
          direction="column"
          background="gray.100"
          p={10}
          rounded={6}
        >
          <Flex style={{
            display: isEditable ? "none" : "block",}}
            alignItems="left"
            justifyContent="left">
            <Text><b>First Name:</b> {inputValue.firstName} </Text> 
            <Text><b>Middle Name:</b> {inputValue.middleName}  </Text>
            <Text><b>Last Name:</b> {inputValue.lastName}  </Text>
            <Text><b>Email:</b> {inputValue.email} </Text>
            <b>Address:</b> {inputValue.street}, {inputValue.city}, {inputSelection.state} {inputValue.zip} 
            <Text><b>Driver's ID:</b> {inputValue.driverID} </Text>
            <Text><b>Passport ID:</b> {inputValue.passport} </Text>
            </Flex>
            <Flex style={{
            display: isEditable ? "block" : "none",}}>
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
              <Text style={{
              display: isCorrect ? "none" : "block",}} color="red" mb={3}>
              *Please edit the ZIP code as well*
               </Text>
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
                    >
                      *Please use correct email format*
                    </Text>
                  )}
              <Text style={{
              display: isEmailChanged ? "block" : "none",}} color="red" mb={3}>
              *Changing your email will log you out*
               </Text>
              </Stack>
              <Link href="/forgot_password" color="blue">Change Password</Link>
              <Text style={{
              display: isEmpty ? "block" : "none",}} color="red" mb={3}>
              *Please fill out all fields*
               </Text>
              </Flex>
              <Stack direction="row">
              <Button
              data-testid="saveButton"
              colorScheme="teal"
              width="70px"
              style={{
              display: isEditable ? "block" : "none",}}
              onClick={handleSave}
              > Save
              </Button>
              <Button
              data-testid="editButton"
              colorScheme="teal"
              width="70px"
              onClick={isEditable ? handleClose : handleEdit}
              >
              {isEditable ? "Close" : "Edit"}
              </Button>
              </Stack>
        <Text fontSize="xs" mt={6}>
        Voting System
        </Text>
        </Flex>
        </Flex>
        </div>
    
      )
  
}
