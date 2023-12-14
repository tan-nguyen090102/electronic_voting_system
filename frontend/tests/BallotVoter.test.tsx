/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BallotPanel from "../src/Features/Ballot";
import { testObject } from "./testData.js";
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
    json: () => Promise.resolve({ test: "" }),
  })
) as jest.Mock;

test("Summary button click", async () => {
  render(
    <BrowserRouter>
      <BallotPanel />
    </BrowserRouter>
  );
  const summaryButton = screen.getByTestId("summaryButton");
  act(() => userEvent.click(summaryButton));
  waitFor(() => {
    expect(summaryButton).toBeDefined();
  });
});

test("Close button click", async () => {
  render(
    <BrowserRouter>
      <BallotPanel />
    </BrowserRouter>
  );
  const summaryButton = await screen.getByTestId("summaryButton");
  await act(() => userEvent.click(summaryButton));
  await waitFor(() => {
    expect(screen.getByTestId("closeButton")).toBeInTheDocument();
  });
  await act(() => {
    const closeButton = screen.getByTestId("closeButton");
    act(() => userEvent.click(closeButton));
    waitFor(() => {
      expect(closeButton).toBeDefined();
    });
  });
});
