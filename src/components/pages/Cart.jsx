import { useOutletContext } from "react-router";
import CartCard from "../CartCard";

export default function Cart() {
  const { products, cartItems, setCartItems } = useOutletContext();

  const getScammed = () => {
    alert("HAH! Get scammed!");
  };

  return (
    <div className="container">
      <h1>Cart</h1>

      {cartItems.length <= 0 ? (
        <p>There's nothing in your cart! You haven't been scammed enough!</p>
      ) : (
        <ul>
          {cartItems.map((cartItem) => {
            return (
              <CartCard
                cartItem={cartItem}
                products={products}
                cartItems={cartItems}
                setCartItems={setCartItems}
                key={cartItem.id}
              />
            );
          })}
        </ul>
      )}

      <p>
        Total: $
        {cartItems.reduce((total, item) => total + item.quantity, 0).toFixed(2)}
      </p>
      <input type="button" value="Get Scammed" onClick={getScammed} />
    </div>
  );
}
