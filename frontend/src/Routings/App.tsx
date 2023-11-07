import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "../Features/LogIn";
import HomePage from "../Features/Home";
import SignUpPanel from "../Features/SignUp";
import ForgotPanel from "../Features/ForgotPassword";
import ChangePasswordPanel from "../Features/ChangePassword";
import TwoStepPanel from "../Features/TwoStepVerification";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPanel />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUpPanel />}></Route>
        <Route path="/forgot_password" element={<ForgotPanel />}></Route>
        <Route
          path="/change_password"
          element={<ChangePasswordPanel />}
        ></Route>
        <Route path="/verification" element={<TwoStepPanel />}></Route>
      </Routes>
    </>
  );
}
