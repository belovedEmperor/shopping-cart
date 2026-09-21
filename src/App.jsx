import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import Bar from "./components/Bar";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  console.log(products);

  return (
    <>
      <Bar cartItems={cartItems} />
      <Outlet context={{ products, cartItems, setCartItems }} />
    </>
  );
}

export default App;
