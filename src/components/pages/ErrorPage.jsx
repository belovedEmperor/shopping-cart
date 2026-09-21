import { Link } from "react-router";
import Bar from "../Bar";

export default function ErrorPage() {
  return (
    <>
      <Bar />
      <div className="container">
        <h1>Oops! This page doesn't exist!</h1>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
}
