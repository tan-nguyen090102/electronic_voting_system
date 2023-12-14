/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UserProfilePanel from "../src/Features/UserProfile";
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
    json: () => Promise.resolve({ test: "Successful mock" }),
  })
) as jest.Mock;

test("First name input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("firstName");
      userEvent.type(field, testObject.firstName);
      expect(field).toHaveValue(testObject.firstName);
    });
  });
});

test("Middle name input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("middleName")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("middleName");
      userEvent.type(field, testObject.middleName);
      expect(field).toHaveValue(testObject.middleName);
    });
  });
});

test("Last name input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("lastName");
      userEvent.type(field, testObject.lastName);
      expect(field).toHaveValue(testObject.lastName);
    });
  });
});

test("Street input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("street")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("street");
      userEvent.type(field, testObject.street);
      expect(field).toHaveValue(testObject.street);
    });
  });
});

test("City input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("city")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("city");
      userEvent.type(field, testObject.city);
      expect(field).toHaveValue(testObject.city);
    });
  });
});

test("State select", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("state")).toBeInTheDocument();
    act(() => {
      const selection = screen.getByTestId("state");
      userEvent.selectOptions(selection, testObject.state);
      expect(screen.getByText(testObject.state)).toBeInTheDocument();
    });
  });
});

test("Zip input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("zip")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("zip");
      userEvent.type(field, testObject.zip);
      expect(field).toHaveValue(testObject.zip);
    });
  });
});

test("Email input", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("email")).toBeInTheDocument();
    act(() => {
      const field = screen.getByTestId("email");
      userEvent.type(field, testObject.email);
      expect(field).toHaveValue(testObject.email);
    });
  });
});

test("Save button click", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  await waitFor(() => {
    expect(screen.getByTestId("saveButton")).toBeInTheDocument();
    const cancelButton = screen.getByTestId("saveButton");
    act(() => userEvent.click(cancelButton));
    waitFor(() => expect(cancelButton).toBeDefined());
  });
});

test("Edit/Cancel button click", async () => {
  render(
    <BrowserRouter>
      <UserProfilePanel />
    </BrowserRouter>
  );
  const editButton = await screen.getByTestId("editButton");
  await act(() => userEvent.click(editButton));
  waitFor(() => expect(editButton).toBeDefined());
});
