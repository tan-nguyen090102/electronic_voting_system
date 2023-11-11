/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PrecinctPanel from "../src/Features/Precinct";
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

test("State select", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
    </BrowserRouter>
  );
  await act(() => {
    const selection = screen.getByTestId("state");
    userEvent.selectOptions(selection, testObject.state);
    expect(screen.getByText(testObject.state)).toBeInTheDocument();
  });
});

test("Add button click", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});
