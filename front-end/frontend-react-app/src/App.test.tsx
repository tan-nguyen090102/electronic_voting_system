import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPanel from "./LogIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("UserID input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const userIDInputField = screen.getByTestId("userID");
  await userEvent.type(userIDInputField, "danielnguyen");
  expect(userIDInputField).toHaveValue("danielnguyen");
});

test("Password input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const passwordInputField = screen.getByTestId("password");
  await userEvent.type(passwordInputField, "12345");
  expect(passwordInputField).toHaveValue("12345");
});

test("Login button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const userIDInputField = screen.getByTestId("userID");
  const passwordInputField = screen.getByTestId("password");
  const loginButton = screen.getByTestId("loginButton");
  await userEvent.type(userIDInputField, "tannguyen");
  await userEvent.type(passwordInputField, "14we4");
  await userEvent.click(loginButton);
});
