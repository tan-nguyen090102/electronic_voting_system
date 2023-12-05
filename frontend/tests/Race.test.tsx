/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import RacePanel from "../src/Features/Race";
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
      <RacePanel />
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
      <RacePanel />
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
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add Title input", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("title")).toBeInTheDocument();
    const field = screen.getByTestId("title");
    userEvent.type(field, testObject.title);
    expect(field).toHaveValue(testObject.title);
  });
});

test("Add Type of Race input", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("type")).toBeInTheDocument();
    const field = screen.getByTestId("type");
    userEvent.type(field, testObject.type);
    expect(field).toHaveValue(testObject.type);
  });
});

test("Add Term of Service input", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("term")).toBeInTheDocument();
    const field = screen.getByTestId("term");
    userEvent.type(field, testObject.term);
    expect(field).toHaveValue(testObject.term);
  });
});

test("Add District ID input", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("districtID")).toBeInTheDocument();
    const field = screen.getByTestId("districtID");
    userEvent.type(field, testObject.districtID);
    expect(field).toHaveValue(testObject.districtID);
  });
});

test("Add Election ID input", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("electionID")).toBeInTheDocument();
    const field = screen.getByTestId("electionID");
    userEvent.type(field, testObject.electionID);
    expect(field).toHaveValue(testObject.electionID);
  });
});

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <RacePanel />
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
      <RacePanel />
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
