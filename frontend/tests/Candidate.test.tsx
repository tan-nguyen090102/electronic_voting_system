/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CandidatePanel from "../src/Features/Candidate";
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
      <CandidatePanel />
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
      <CandidatePanel />
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
      <CandidatePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add First name input", async () => {
  render(
    <BrowserRouter>
      <CandidatePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    const field = screen.getByTestId("firstName");
    userEvent.type(field, testObject.firstName);
    expect(field).toHaveValue(testObject.firstName);
  });
});

test("Add Last name input", async () => {
  render(
    <BrowserRouter>
      <CandidatePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    const field = screen.getByTestId("lastName");
    userEvent.type(field, testObject.lastName);
    expect(field).toHaveValue(testObject.lastName);
  });
});

test("Add Geography ID input", async () => {
  render(
    <BrowserRouter>
      <CandidatePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("geographyID")).toBeInTheDocument();
    const field = screen.getByTestId("geographyID");
    userEvent.type(field, testObject.geographyID);
    expect(field).toHaveValue(testObject.geographyID);
  });
});

test("Add Date of Birth input", async () => {
  render(
    <BrowserRouter>
      <CandidatePanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("dob")).toBeInTheDocument();
    const field = screen.getByTestId("dob");
    userEvent.type(field, testObject.dob);
    expect(field).toHaveValue(testObject.dob);
  });
});

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <CandidatePanel />
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
      <CandidatePanel />
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
