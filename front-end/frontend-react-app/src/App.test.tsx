import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginPanel from "./LogIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//Clean up after each test
afterEach(() => {
  cleanup();
});

test("UserID input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const userIDInputField = await screen.getByTestId("userID");
  await userEvent.type(userIDInputField, "danielnguyen");
  expect(userIDInputField).toHaveValue("danielnguyen");
});

test("Password input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const passwordInputField = await screen.getByTestId("password");
  await userEvent.type(passwordInputField, "12345");
  expect(passwordInputField).toHaveValue("12345");
});

test("Login button click", async () => {
  await act(() => {
    render(
      <BrowserRouter>
        <LoginPanel />
      </BrowserRouter>
    );
  });
  const loginButton = await screen.getByTestId("loginButton");
  await act(() => userEvent.click(loginButton));
  await waitFor(() => expect(loginButton).toBeDefined());
});

test("Signup button click", async () => {
  await act(() => {
    render(
      <BrowserRouter>
        <LoginPanel />
      </BrowserRouter>
    );
  });
  const signupButton = await screen.getByTestId("signupButton");
  await act(() => userEvent.click(signupButton));
  await waitFor(() => expect(signupButton).toBeDefined());
});
