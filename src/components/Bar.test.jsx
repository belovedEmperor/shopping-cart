import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Bar from "./Bar";
import { MemoryRouter } from "react-router";

function renderBar() {
  render(
    <MemoryRouter>
      <Bar />
    </MemoryRouter>,
  );
}

describe("Bar", () => {
  it("renders name", () => {
    renderBar();
    expect(screen.getByRole("heading").textContent).toMatch(
      /we will scam you!/i,
    );
  });

  it("has a home page link", () => {
    renderBar();
    expect(screen.getByRole("link", { name: /Home/ })).toBeInTheDocument();
  });

  it("has a shop page link", () => {
    renderBar();
    expect(screen.getByRole("link", { name: /Shop/ })).toBeInTheDocument();
  });

  it("has a cart page link", () => {
    renderBar();
    expect(screen.getByRole("link", { name: /Cart/ })).toBeInTheDocument();
  });
});
