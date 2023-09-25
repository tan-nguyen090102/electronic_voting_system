import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "./LogIn";
import HomePage from "./Home";
import SignUpPanel from "./SignUp";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPanel />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUpPanel />}></Route>
      </Routes>
    </>
  );
}
