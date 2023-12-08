/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BallotAdminPanel from "../src/Features/BallotAdmin";
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

test("State select", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  await act(() => {
    const selection = screen.getByTestId("state");
    userEvent.selectOptions(selection, testObject.state);
    expect(screen.getByText(testObject.state)).toBeInTheDocument();
  });
});

test("Filter button click", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const filterButton = await screen.getByTestId("filterButton");
  await act(() => userEvent.click(filterButton));
  await waitFor(() => {
    expect(filterButton).toBeDefined();
  });
});

test("Add button click", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add Precinct input", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("precinctIDcovers")).toBeInTheDocument();
    const field = screen.getByTestId("precinctIDcovers");
    userEvent.type(field, testObject.precinctID);
    expect(field).toHaveValue(testObject.precinctID);
  });
});

test("Add Race input", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("raceIDcovers")).toBeInTheDocument();
    const field = screen.getByTestId("raceIDcovers");
    userEvent.type(field, testObject.raceID);
    expect(field).toHaveValue(testObject.raceID);
  });
});

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("addAddButton")).toBeInTheDocument();
    const addButton = screen.getByTestId("addAddButton");
    act(() => userEvent.click(addButton));
    waitFor(() => {
      expect(addButton).toBeDefined();
    });
  });
});

test("Add Cancel button click", async () => {
  render(
    <BrowserRouter>
      <BallotAdminPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
    const cancelButton = screen.getByTestId("cancelButton");
    act(() => userEvent.click(cancelButton));
    waitFor(() => {
      expect(cancelButton).toBeDefined();
    });
  });
});
