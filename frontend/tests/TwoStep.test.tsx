/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import TwoStepPanel from "../src/Features/TwoStepVerification";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData";
import React from "react";

//Clean up after each test
afterEach(() => {
  cleanup();
});

let spy: jest.SpyInstance;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: "Successful mock" }),
  })
) as jest.Mock;

test("Code input", async () => {
  render(
    <BrowserRouter>
      <TwoStepPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("code");
    userEvent.type(field, testObject.code);
    expect(field).toHaveValue(testObject.code);
  });
});

test("Submit button click", async () => {
  render(
    <BrowserRouter>
      <TwoStepPanel />
    </BrowserRouter>
  );
  await act(() => {
    const submitButton = screen.getByTestId("submitButton");
    act(() => userEvent.click(submitButton));
    waitFor(() => {
      expect(submitButton).toBeDefined();
    });
  });
});

test("Cancel button click", async () => {
  render(
    <BrowserRouter>
      <TwoStepPanel />
    </BrowserRouter>
  );
  await act(() => {
    const cancelButton = screen.getByTestId("cancelButton");
    act(() => userEvent.click(cancelButton));
    waitFor(() => expect(cancelButton).toBeDefined());
  });
});
