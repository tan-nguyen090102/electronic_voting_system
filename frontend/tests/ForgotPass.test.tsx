/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ForgotPanel from "../src/Features/ForgotPassword";
import { testObject } from "./testData.js";
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

test("Email input", async () => {
  render(
    <BrowserRouter>
      <ForgotPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("email");
    userEvent.type(field, testObject.email);
    expect(field).toHaveValue(testObject.email);
  });
});

test("Security Answer input", async () => {
  render(
    <BrowserRouter>
      <ForgotPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("securityAnswer");
    userEvent.type(field, testObject.securityAnswer);
    expect(field).toHaveValue(testObject.securityAnswer);
  });
});

test("Send button click", async () => {
  render(
    <BrowserRouter>
      <ForgotPanel />
    </BrowserRouter>
  );
  const sendButton = await screen.getByTestId("sendButton");
  await act(() => userEvent.click(sendButton));
  await waitFor(() => {
    expect(sendButton).toBeDefined();
  });
});

test("Cancel button click", async () => {
  render(
    <BrowserRouter>
      <ForgotPanel />
    </BrowserRouter>
  );
  const cancelButton = await screen.getByTestId("cancelButton");
  await act(() => userEvent.click(cancelButton));
  await waitFor(() => expect(cancelButton).toBeDefined());
});
