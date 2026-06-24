import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@astryxdesign/core";

export const Home = () => {
  return (
    <>
      <section>
        <h1>Home</h1>
        <p>TODO!</p>
        <Button label="Click Me!"/>
      </section>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
};
