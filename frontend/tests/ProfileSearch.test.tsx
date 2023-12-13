/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchPanel from "../src/Features/ProfileSearch";
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

test("First Name input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("firstName");
    userEvent.type(field, testObject.firstName);
    expect(field).toHaveValue(testObject.firstName);
  });
});

test("Last Name input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("lastName");
    userEvent.type(field, testObject.lastName);
    expect(field).toHaveValue(testObject.lastName);
  });
});

test("Zip input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("zip");
    userEvent.type(field, testObject.zip);
    expect(field).toHaveValue(testObject.zip);
  });
});

test("Precinct ID input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("precinctID");
    userEvent.type(field, testObject.precinctID);
    expect(field).toHaveValue(testObject.precinctID);
  });
});

test("Search button click", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  const searchButton = await screen.getByTestId("searchButton");
  await act(() => userEvent.click(searchButton));
  await waitFor(() => {
    expect(searchButton).toBeDefined();
  });
});
