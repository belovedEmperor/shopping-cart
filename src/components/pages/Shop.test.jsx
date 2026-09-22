import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import Shop from "./Shop";

const products = [
  { id: 1, image: "a.png", price: 109.95, title: "Backpack", rating: { rate: 4.1 } },
  { id: 2, image: "b.png", price: 22.3, title: "T-Shirt", rating: { rate: 3.9 } },
];

function renderShop(shownProducts) {
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <Routes>
        <Route
          path="/shop"
          element={
            <Outlet context={{ products: shownProducts, cartItems: [], setCartItems: () => {} }} />
          }
        >
          <Route index element={<Shop />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("Shop page", () => {
  it("renders a card per product", () => {
    renderShop(products);

    expect(screen.getAllByRole("img").length).toBe(2);
  });

  it("shows empty message when no products", () => {
    renderShop([]);

    expect(
      screen.getByText(/there doesn't seem to be any products!/i),
    ).toBeInTheDocument();
  });
});