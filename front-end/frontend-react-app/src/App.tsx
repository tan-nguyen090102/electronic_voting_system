import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "./LogIn";
import HomePage from "./Home";
import SignUpPanel from "./SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPanel />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUpPanel />}></Route>
      </Routes>
    </>
  );
}

export default App;
