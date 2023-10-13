/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import LoginPanel from "../src/Features/LogIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData";

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
    userEvent.type(passwordInputField, testObject.password);
    expect(passwordInputField).toHaveValue(testObject.password);
  });
});

test("Login button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const loginButton = await screen.getByTestId("loginButton");
  await act(() => userEvent.click(loginButton));
  await waitFor(() => {
    expect(loginButton).toBeDefined();
  });
});

test("Signup button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  const signupButton = await screen.getByTestId("signupButton");
  await act(() => userEvent.click(signupButton));
  await waitFor(() => expect(signupButton).toBeDefined());
});
