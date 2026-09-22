import { useOutletContext } from "react-router";
import CartCard from "../CartCard";

export default function Cart() {
  const { products, cartItems, setCartItems } = useOutletContext();

  const getScammed = () => {
    alert("HAH! Get scammed!");
  };

  const total = cartItems.reduce((total, item) => {
    const product = products.find((product) => product.id === item.id);
    return total + (product?.price ?? 0) * (Number(item.quantity) || 0);
  }, 0);

  return (
    <div id="cart" className="container">
      <h1>Cart</h1>

      {cartItems.length <= 0 ? (
        <p>There's nothing in your cart! You haven't been scammed enough!</p>
      ) : (
        <ul>
          {cartItems.map((cartItem) => {
            return (
              <li>
                <CartCard
                  cartItem={cartItem}
                  products={products}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  key={cartItem.id}
                />
              </li>
            );
          })}
        </ul>
      )}

      <p>Total: ${total.toFixed(2)}</p>
      <input type="button" value="Get Scammed" onClick={getScammed} />
    </div>
  );
}
