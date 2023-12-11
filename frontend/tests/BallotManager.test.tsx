/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BallotManagerPage from "../src/Features/BallotManager";
import { testObject } from "./testData.js";
import React from "react";

//Clean up after each test
afterEach(() => {
  cleanup();
});

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: "" }),
  })
) as jest.Mock;

test("Activate button click", async () => {
  render(
    <BrowserRouter>
      <BallotManagerPage />
    </BrowserRouter>
  );
  const activateButton = await screen.getByTestId("activateButton");
  await act(() => userEvent.click(activateButton));
  await waitFor(() => {
    expect(activateButton).toBeDefined();
  });
});

test("Add Election ID input", async () => {
  render(
    <BrowserRouter>
      <BallotManagerPage />
    </BrowserRouter>
  );
  const activateButton = await screen.getByTestId("activateButton");
  await act(() => userEvent.click(activateButton));
  await waitFor(() => {
    expect(screen.getByTestId("electionID")).toBeInTheDocument();
    const field = screen.getByTestId("electionID");
    userEvent.type(field, testObject.electionID);
    expect(field).toHaveValue(testObject.electionID);
  });
});

test("Activation button click", async () => {
  render(
    <BrowserRouter>
      <BallotManagerPage />
    </BrowserRouter>
  );
  const activateButton = await screen.getByTestId("activateButton");
  await act(() => userEvent.click(activateButton));
  await waitFor(() => {
    expect(screen.getByTestId("activationButton")).toBeInTheDocument();
    const activationButton = screen.getByTestId("activationButton");
    act(() => userEvent.click(activationButton));
    waitFor(() => {
      expect(activationButton).toBeDefined();
    });
  });
});

test("Add Cancel button click", async () => {
  render(
    <BrowserRouter>
      <BallotManagerPage />
    </BrowserRouter>
  );
  const activateButton = await screen.getByTestId("activateButton");
  await act(() => userEvent.click(activateButton));
  await waitFor(() => {
    expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
    const cancelButton = screen.getByTestId("cancelButton");
    act(() => userEvent.click(cancelButton));
    waitFor(() => {
      expect(cancelButton).toBeDefined();
    });
  });
});
