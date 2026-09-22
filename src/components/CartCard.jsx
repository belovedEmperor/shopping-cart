export default function CartCard({
  cartItem,
  products,
  cartItems,
  setCartItems,
}) {
  const product = products.find((product) => product.id === cartItem.id);

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <span>{product.title}</span>
        <span>{product.price}</span>
      </div>
      <CartForm
        cartItem={cartItem}
        product={product}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
}

function CartForm({ cartItem, cartItems, setCartItems }) {
  const quantityNumber = Number(cartItem.quantity) || 1;

  const setQuantity = (newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const incrementQuantity = () => setQuantity(quantityNumber + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantityNumber - 1));

  const deleteItem = (itemToBeDeleted) =>
    setCartItems(cartItems.filter((item) => item.id !== itemToBeDeleted.id));

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        value={cartItem.quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <div>
        <input type="button" value="+" onClick={incrementQuantity} />
        <input type="button" value="-" onClick={decrementQuantity} />
      </div>

      <input type="button" value="X" onClick={() => deleteItem(cartItem)} />
    </form>
  );
}
