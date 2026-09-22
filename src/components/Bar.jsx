import { Link } from "react-router";

export default function Bar({ cartItems = [] }) {
  const cartItemCount = cartItems.reduce(
    (itemCount, item) => itemCount + (Number(item.quantity) || 0),
    0,
  );

  return (
    <div>
      <h1>We Will Scam You!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart
              <span>{cartItemCount}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
