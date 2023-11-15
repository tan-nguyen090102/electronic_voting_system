/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import ProfileRequestPanel from "../src/Features/ProfileRequest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData.js";

//Clean up after each test
afterEach(() => {
  cleanup();
});

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(testObject),
  })
) as jest.Mock;

global.scrollTo = jest.fn();

test("Approved button click", async () => {
  render(
    <BrowserRouter>
      <ProfileRequestPanel />
    </BrowserRouter>
  );
  const approvedButton = await screen.getByTestId("approvedButton");
  await act(() => userEvent.click(approvedButton));
  await waitFor(() => {
    expect(approvedButton).toBeInTheDocument();
  });
});

test("Pending button click", async () => {
  render(
    <BrowserRouter>
      <ProfileRequestPanel />
    </BrowserRouter>
  );
  const pendingButton = await screen.getByTestId("pendingButton");
  await act(() => userEvent.click(pendingButton));
  await waitFor(() => expect(pendingButton).toBeInTheDocument());
});

test("Denied button click", async () => {
  render(
    <BrowserRouter>
      <ProfileRequestPanel />
    </BrowserRouter>
  );
  const deniedButton = await screen.getByTestId("deniedButton");
  await act(() => userEvent.click(deniedButton));
  await waitFor(() => expect(deniedButton).toBeInTheDocument());
});
