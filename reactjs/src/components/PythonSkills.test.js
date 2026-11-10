import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import PythonSkills from "./PythonSkills";

jest.mock("axios");

describe("PythonSkills", () => {
  const originalBaseUrl = process.env.REACT_APP_FASTAPI_BASE_URL;

  afterEach(() => {
    if (originalBaseUrl === undefined) {
      delete process.env.REACT_APP_FASTAPI_BASE_URL;
    } else {
      process.env.REACT_APP_FASTAPI_BASE_URL = originalBaseUrl;
    }
    jest.clearAllMocks();
  });

  test.each([
    [undefined, "/portfolio/api/python/skills"],
    ["http://localhost:8000/portfolio/api/python", "http://localhost:8000/portfolio/api/python/skills"],
  ])("fetches skills using base URL %s", async (baseUrl, expectedUrl) => {
    if (baseUrl === undefined) {
      delete process.env.REACT_APP_FASTAPI_BASE_URL;
    } else {
      process.env.REACT_APP_FASTAPI_BASE_URL = baseUrl;
    }
    axios.get.mockResolvedValue({ data: { skills: [{ name: "Python", stream: "Backend" }] } });

    const { findByText } = render(<PythonSkills />);

    expect(await findByText("Python")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});
