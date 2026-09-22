import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import CartCard from "./CartCard";
import userEvent from "@testing-library/user-event";

const products = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
  },
];

let cartItems = [
  { id: 1, quantity: 6 },
  { id: 2, quantity: 3 },
];

beforeEach(() => {
  cartItems = [
    { id: 1, quantity: 6 },
    { id: 2, quantity: 3 },
  ];
});

function renderCartCard() {
  const setCartItems = (newItems) => (cartItems = newItems);

  render(
    <CartCard
      cartItem={cartItems[0]}
      products={products}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />,
  );
}

describe("cart card & form", () => {
  it("renders product image", () => {
    renderCartCard();

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders product titles", () => {
    renderCartCard();

    expect(screen.getByText(products[0].title.trim())).toBeInTheDocument();
  });

  it("renders product prices", () => {
    renderCartCard();

    expect(screen.getByText(products[0].price)).toBeInTheDocument();
  });

  it("increments cart item quantity", async () => {
    renderCartCard();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(cartItems[0].quantity).toBe(7);
  });

  it("decrements cart item quantity", async () => {
    renderCartCard();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(cartItems[0].quantity).toBe(5);
  });

  it("deletes cart items", async () => {
    renderCartCard();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "X" }));

    expect(cartItems.length).toBe(1);
  });
});
