
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { Layout, LayoutContent } from "@astryxdesign/core";

function App() {
  return (
    <>
      <Layout
        content={
          <LayoutContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </LayoutContent>
        }
      />
    </>
  );
}

export default App;
