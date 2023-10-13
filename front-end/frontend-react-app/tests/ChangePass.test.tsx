/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ChangePasswordPanel from "../src/Features/ChangePassword";
import { testObject } from "./testData.js";

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

test("New Password input", async () => {
  render(
    <BrowserRouter>
      <ChangePasswordPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("password");
    userEvent.type(field, testObject.password);
    expect(field).toHaveValue(testObject.password);
  });
});

test("New Password Retype input", async () => {
  render(
    <BrowserRouter>
      <ChangePasswordPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("passwordRetype");
    userEvent.type(field, testObject.password);
    expect(field).toHaveValue(testObject.password);
  });
});

test("Confirm button click", async () => {
  render(
    <BrowserRouter>
      <ChangePasswordPanel />
    </BrowserRouter>
  );
  const sendButton = await screen.getByTestId("confirmButton");
  await act(() => userEvent.click(sendButton));
  await waitFor(() => {
    expect(sendButton).toBeDefined();
  });
});

test("Cancel button click", async () => {
  render(
    <BrowserRouter>
      <ChangePasswordPanel />
    </BrowserRouter>
  );
  const cancelButton = await screen.getByTestId("cancelButton");
  await act(() => userEvent.click(cancelButton));
  await waitFor(() => expect(cancelButton).toBeDefined());
});
