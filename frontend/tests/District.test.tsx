/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import DistrictPanel from "../src/Features/District";
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

test("State select", async () => {
  render(
    <BrowserRouter>
      <DistrictPanel />
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
      <DistrictPanel />
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
      <DistrictPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add District ID input", async () => {
  render(
    <BrowserRouter>
      <DistrictPanel />
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

test("Add Title input", async () => {
  render(
    <BrowserRouter>
      <DistrictPanel />
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

test("Add Official ID input", async () => {
  render(
    <BrowserRouter>
      <DistrictPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("officialID")).toBeInTheDocument();
    const field = screen.getByTestId("officialID");
    userEvent.type(field, testObject.officialID);
    expect(field).toHaveValue(testObject.officialID);
  });
});

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <DistrictPanel />
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
      <DistrictPanel />
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
