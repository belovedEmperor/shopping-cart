import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ShopCard from "./ShopCard";
import userEvent from "@testing-library/user-event";

const product = {
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  price: 109.95,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  rating: { rate: 4.1, count: 259 },
};

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

function renderShopCard() {
  const setCartItems = (newItems) => (cartItems = newItems);

  render(
    <ShopCard
      product={product}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />,
  );
}

describe("shop card & form", () => {
  it("renders product image", () => {
    renderShopCard();

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders product title", () => {
    renderShopCard();

    expect(screen.getByText(product.title.trim())).toBeInTheDocument();
  });

  it("renders product price", () => {
    renderShopCard();

    expect(screen.getByText(product.price)).toBeInTheDocument();
  });

  it("renders product rating", () => {
    renderShopCard();

    expect(screen.getByText(product.rating.rate)).toBeInTheDocument();
  });

  it("adds products with quantity to cart", async () => {
    cartItems = [];
    renderShopCard();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    expect(cartItems).toEqual([{ id: 1, quantity: 1 }]);
  });

  it("merges quantity when product already in cart", async () => {
    renderShopCard();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    expect(cartItems.length).toBe(2);
    expect(cartItems[0]).toEqual({ id: 1, quantity: 8 });
  });

  it("uses quantity typed by hand", async () => {
    cartItems = [];
    renderShopCard();
    const user = userEvent.setup();

    await user.clear(screen.getByRole("textbox"));
    await user.type(screen.getByRole("textbox"), "3");
    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    expect(cartItems).toEqual([{ id: 1, quantity: 3 }]);
  });

  it("keeps quantity at 1 when decrementing below", async () => {
    renderShopCard();
    const user = userEvent.setup();

    await user.clear(screen.getByRole("textbox"));
    await user.type(screen.getByRole("textbox"), "0");
    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByRole("textbox").value).toBe("1");
  });
});
