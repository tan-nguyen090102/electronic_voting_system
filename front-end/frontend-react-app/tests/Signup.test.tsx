/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUpPanel from "../src/Features/SignUp";
import { testObject } from "./testData.js";

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

test("First name input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("firstName");
    userEvent.type(field, testObject.firstName);
    expect(field).toHaveValue(testObject.firstName);
  });
});

test("Middle name input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("middleName");
    userEvent.type(field, testObject.middleName);
    expect(field).toHaveValue(testObject.middleName);
  });
});

test("Last name input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("lastName");
    userEvent.type(field, testObject.lastName);
    expect(field).toHaveValue(testObject.lastName);
  });
});

test("Street input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("street");
    userEvent.type(field, testObject.street);
    expect(field).toHaveValue(testObject.street);
  });
});

test("City input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("city");
    userEvent.type(field, testObject.city);
    expect(field).toHaveValue(testObject.city);
  });
});

test("State select", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const selection = screen.getByTestId("state");
    userEvent.selectOptions(selection, testObject.state);
    expect(screen.getByText(testObject.state)).toBeInTheDocument();
  });
});

test("Zip input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("zip");
    userEvent.type(field, testObject.zip);
    expect(field).toHaveValue(testObject.zip);
  });
});

test("Email input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("email");
    userEvent.type(field, testObject.email);
    expect(field).toHaveValue(testObject.email);
  });
});

test("Password input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("password");
    userEvent.type(field, testObject.password);
    expect(field).toHaveValue(testObject.password);
  });
});

test("Password Retype input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("passwordRetype");
    userEvent.type(field, testObject.password);
    expect(field).toHaveValue(testObject.password);
  });
});

test("Phone input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("phone");
    userEvent.type(field, testObject.phone);
    expect(field).toHaveValue(testObject.phone);
  });
});

test("DriverID input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("driverID");
    userEvent.type(field, testObject.driverID);
    expect(field).toHaveValue(testObject.driverID);
  });
});

test("Security Answer input", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  await act(() => {
    const field = screen.getByTestId("securityAnswer");
    userEvent.type(field, testObject.securityAnswer);
    expect(field).toHaveValue(testObject.securityAnswer);
  });
});

test("Sign up button click", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  const sendButton = await screen.getByTestId("signupButton");
  await act(() => userEvent.click(sendButton));
  await waitFor(() => {
    expect(sendButton).toBeDefined();
  });
});

test("Cancel button click", async () => {
  render(
    <BrowserRouter>
      <SignUpPanel />
    </BrowserRouter>
  );
  const cancelButton = await screen.getByTestId("cancelButton");
  await act(() => userEvent.click(cancelButton));
  await waitFor(() => expect(cancelButton).toBeDefined());
});
