import { useState } from "react";

export default function ShopCard({ product, cartItems, setCartItems }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <span>{product.title}</span>
        <span>{product.rating.rate}</span>
        <span>{product.price}</span>
      </div>
      <CartForm
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
}

function CartForm({ product, quantity, setQuantity, cartItems, setCartItems }) {
  const quantityNumber = Number(quantity) || 1;

  const incrementQuantity = () => setQuantity(quantityNumber + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantityNumber - 1));

  const addToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + quantityNumber }
            : item,
        ),
      );
      return;
    }

    setCartItems([...cartItems, { id: product.id, quantity: quantityNumber }]);
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <div>
        <input type="button" value="+" onClick={incrementQuantity} />
        <input type="button" value="-" onClick={decrementQuantity} />
      </div>
      <input type="button" value="Add To Cart" onClick={addToCart} />
    </form>
  );
}
