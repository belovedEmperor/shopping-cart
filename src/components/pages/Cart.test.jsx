import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import Cart from "./Cart";

const products = [
  { id: 1, image: "a.png", price: 109.95, title: "Backpack" },
  { id: 2, image: "b.png", price: 22.3, title: "T-Shirt" },
];

function renderCart(cartItems) {
  render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route
          path="/cart"
          element={<Outlet context={{ products, cartItems, setCartItems: () => {} }} />}
        >
          <Route index element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("Cart page", () => {
  it("renders cart total", () => {
    renderCart([
      { id: 1, quantity: 6 },
      { id: 2, quantity: 3 },
    ]);

    expect(screen.getByText("Total: $726.60")).toBeInTheDocument();
  });

  it("ignores unknown products and non-numeric quantities", () => {
    renderCart([
      { id: 1, quantity: 6 },
      { id: 2, quantity: 3 },
      { id: 99, quantity: "x" },
    ]);

    expect(screen.getByText("Total: $726.60")).toBeInTheDocument();
  });

  it("shows empty cart message", () => {
    renderCart([]);

    expect(
      screen.getByText(/there's nothing in your cart!/i),
    ).toBeInTheDocument();
  });
});