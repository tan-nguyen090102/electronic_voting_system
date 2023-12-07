/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import ElectionPanel from "../src/Features/Election";
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

test("Active button click", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
    </BrowserRouter>
  );
  const button = await screen.getByTestId("activeButton");
  await act(() => userEvent.click(button));
  await waitFor(() => {
    expect(button).toBeInTheDocument();
  });
});

test("Inactive button click", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
    </BrowserRouter>
  );
  const button = await screen.getByTestId("inactiveButton");
  await act(() => userEvent.click(button));
  await waitFor(() => {
    expect(button).toBeInTheDocument();
  });
});

test("State select", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
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
      <ElectionPanel />
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
      <ElectionPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add Election ID input", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
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

test("Add Title input", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
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

test("Add Date of Election input", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("date")).toBeInTheDocument();
    const field = screen.getByTestId("date");
    userEvent.type(field, testObject.date);
    expect(field).toHaveValue(testObject.date);
  });
});

test("Add Start Time input", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("startTime")).toBeInTheDocument();
    const field = screen.getByTestId("startTime");
    userEvent.type(field, testObject.startTime);
    expect(field).toHaveValue(testObject.startTime);
  });
});

test("Add End time input", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("endTime")).toBeInTheDocument();
    const field = screen.getByTestId("endTime");
    userEvent.type(field, testObject.endTime);
    expect(field).toHaveValue(testObject.endTime);
  });
});

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <ElectionPanel />
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
      <ElectionPanel />
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
