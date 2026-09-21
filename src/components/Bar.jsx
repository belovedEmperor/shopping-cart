import { Link } from "react-router";

export default function Bar() {
  return (
    <div>
      <svg></svg>
      <nav></nav>
      <ul>
        <li>
          <Link>Home</Link>
        </li>
        <li>
          <Link>Shop</Link>
        </li>
        <li>
          <Link>Cart</Link>
        </li>
      </ul>
    </div>
  );
}
