import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "../Features/LogIn";
import HomePage from "../Features/Home";
import SignUpPanel from "../Features/SignUp";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPanel />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUpPanel />}></Route>
      </Routes>
    </>
  );
}