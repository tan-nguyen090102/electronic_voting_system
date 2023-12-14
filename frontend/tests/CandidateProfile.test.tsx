/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CandidateProfilePanel from "../src/Features/CandidateProfile";
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

test("Return button click", async () => {
  render(
    <BrowserRouter>
      <CandidateProfilePanel />
    </BrowserRouter>
  );
  const returnButton = await screen.getByTestId("returnButton");
  await act(() => userEvent.click(returnButton));
  await waitFor(() => {
    expect(returnButton).toBeDefined();
  });
});
