/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PrecinctPanel, { CreateAddModalBox } from "../src/Features/Precinct";
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
      <PrecinctPanel />
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
      <PrecinctPanel />
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
      <PrecinctPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(addButton).toBeDefined();
  });
});

test("Add Head Manager input", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("head")).toBeInTheDocument();
    const field = screen.getByTestId("head");
    userEvent.type(field, testObject.head);
    expect(field).toHaveValue(testObject.head);
  });
});

test("Add Address input", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
    </BrowserRouter>
  );
  const addButton = await screen.getByTestId("addButton");
  await act(() => userEvent.click(addButton));
  await waitFor(() => {
    expect(screen.getByTestId("address")).toBeInTheDocument();
    const field = screen.getByTestId("address");
    userEvent.type(field, testObject.address);
    expect(field).toHaveValue(testObject.address);
  });
});

test("Add Geography ID input", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
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

test("Add District ID input", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
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

// test("Cover Zips input", async () => {
//   render(
//     <BrowserRouter>
//       <PrecinctPanel />
//     </BrowserRouter>
//   );
//   const addButton = await screen.getByTestId("addButton");
//   await act(() => userEvent.click(addButton));
//   await waitFor(() => {
//     expect(screen.getByTestId("covers")).toBeInTheDocument();
//     const field = screen.getByTestId("covers");
//     userEvent.type(field, testObject.covers);
//     expect(field).toHaveValue(testObject.covers);
//   });
// });

test("Add Add button click", async () => {
  render(
    <BrowserRouter>
      <PrecinctPanel />
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
      <PrecinctPanel />
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
