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

test("Name input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("name");
    userEvent.type(field, testObject.name);
    expect(field).toHaveValue(testObject.name);
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

test("Station ID input", async () => {
  render(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("stationID");
    userEvent.type(field, testObject.stationID);
    expect(field).toHaveValue(testObject.stationID);
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
