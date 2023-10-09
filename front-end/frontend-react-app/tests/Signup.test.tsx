/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUpPanel from "../src/Features/SignUp";

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
    userEvent.type(field, "Tan");
    expect(field).toHaveValue("Tan");
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
    userEvent.type(field, "Thanh");
    expect(field).toHaveValue("Thanh");
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
    userEvent.type(field, "Nguyen");
    expect(field).toHaveValue("Nguyen");
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
    userEvent.type(field, "447 Cameron Way");
    expect(field).toHaveValue("447 Cameron Way");
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
    userEvent.type(field, "North Liberty");
    expect(field).toHaveValue("North Liberty");
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
    userEvent.type(field, "52317");
    expect(field).toHaveValue("52317");
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
    userEvent.type(field, "tannguyen@uiowa.edu");
    expect(field).toHaveValue("tannguyen@uiowa.edu");
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
    userEvent.type(field, "NoSQLAlchemy");
    expect(field).toHaveValue("NoSQLAlchemy");
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
    userEvent.type(field, "3197777777");
    expect(field).toHaveValue("3197777777");
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
    userEvent.type(field, "yyyyyyyy");
    expect(field).toHaveValue("yyyyyyyy");
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
    userEvent.type(field, "Iowa City");
    expect(field).toHaveValue("Iowa City");
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
