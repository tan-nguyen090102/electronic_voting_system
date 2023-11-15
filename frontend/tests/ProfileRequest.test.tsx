/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import ProfileRequestPanel from "../src/Features/ProfileRequest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData.js";

//Clean up after each test
afterEach(() => {
  cleanup();
});

//Mock fetch
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockImplementation(() => ({ state: "/login" })),
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(testObject),
  })
) as jest.Mock;

test("Approved button click", async () => {
  render(
    <MemoryRouter>
      <ProfileRequestPanel />
    </MemoryRouter>
  );
  const approvedButton = await screen.getByTestId("approvedButton");
  await act(() => userEvent.click(approvedButton));
  await waitFor(() => {
    expect(approvedButton).toBeDefined();
  });
});

test("Deny button click", async () => {
  render(
    <MemoryRouter>
      <ProfileRequestPanel />
    </MemoryRouter>
  );
  const denyButton = await screen.getByTestId("denyButton");
  await act(() => userEvent.click(denyButton));
  await waitFor(() => expect(denyButton).toBeDefined());
});
