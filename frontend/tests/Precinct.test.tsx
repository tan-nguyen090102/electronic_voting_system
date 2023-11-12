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
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

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

// test("Add StationID input", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   await act(() => {
//     const field = screen.getByTestId("stationIDInput");
//     userEvent.type(field, testObject.stationIDInput);
//     expect(field).toHaveValue(testObject.stationIDInput);
//   });
// });

// test("Add Head Manager input", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   await act(() => {
//     const field = screen.getByTestId("head");
//     userEvent.type(field, testObject.head);
//     expect(field).toHaveValue(testObject.head);
//   });
// });

// test("Add Address input", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   await act(() => {
//     const field = screen.getByTestId("address");
//     userEvent.type(field, testObject.address);
//     expect(field).toHaveValue(testObject.address);
//   });
// });

// test("Cover Zips input", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   await act(() => {
//     const field = screen.getByTestId("covers");
//     userEvent.type(field, testObject.zip);
//     expect(field).toHaveValue(testObject.zip);
//   });
// });

// test("Add Add button click", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   const addButton = await screen.getByTestId("addAddButton");
//   await act(() => userEvent.click(addButton));
//   await waitFor(() => {
//     expect(addButton).toBeDefined();
//   });
// });

// test("Add Cancel button click", async () => {
//   render(
//     <BrowserRouter>
//       <CreateAddModalBox isOpen={null} onClose={null} />
//     </BrowserRouter>
//   );
//   const cancelButton = await screen.getByTestId("cancelButton");
//   await act(() => userEvent.click(cancelButton));
//   await waitFor(() => {
//     expect(cancelButton).toBeDefined();
//   });
// });
