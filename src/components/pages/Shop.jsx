import { useOutletContext } from "react-router";
import Card from "../Card";

export default function Shop() {
  const { products, cartItems, setCartItems } = useOutletContext();

  return (
    <>
      <h1>Shop</h1>
      {products.length <= 0 ? (
        <p>There doesn't seem to be any products!</p>
      ) : (
        <ul>
          {products.map((product) => {
            return (
              <Card
                product={product}
                cartItems={cartItems}
                setCartItems={setCartItems}
                key={product.id}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
