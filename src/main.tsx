import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import {y2kTheme} from '@astryxdesign/theme-y2k'
import { Theme } from "@astryxdesign/core";
import "./index.css";
import "@astryxdesign/theme-y2k/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme theme={y2kTheme}>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
