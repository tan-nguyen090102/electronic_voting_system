/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import LoginPanel from "../src/Features/LogIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData";
import React from "react";

//Clean up after each test
afterEach(() => {
  cleanup();
});

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: "Successful mock" }),
  })
) as jest.Mock;

test("UserID input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const userIDInputField = screen.getByTestId("userID");
    userEvent.type(userIDInputField, testObject.userName);
    expect(userIDInputField).toHaveValue(testObject.userName);
  });
});

test("Password input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const passwordInputField = screen.getByTestId("password");
    userEvent.type(passwordInputField, testObject.testPass);
    expect(passwordInputField).toHaveValue(testObject.testPass);
  });
});

test("Login button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const loginButton = screen.getByTestId("loginButton");
    act(() => userEvent.click(loginButton));
    waitFor(() => {
      expect(loginButton).toBeDefined();
    });
  });
});

test("Signup button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const signupButton = screen.getByTestId("signupButton");
    act(() => userEvent.click(signupButton));
    waitFor(() => expect(signupButton).toBeDefined());
  });
});

test("Select role", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const selection = screen.getByTestId("role");
    userEvent.selectOptions(selection, testObject.role);
    expect(screen.getByText(testObject.role)).toBeInTheDocument();
  });
});

test("VS-ID input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const IDInputField = screen.getByTestId("employeeID");
    userEvent.type(IDInputField, testObject.employeeID);
    expect(IDInputField).toHaveValue(testObject.employeeID);
  });
});
