import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AppThemeProvider } from "./theme/ThemeContext";
import { AppLocaleProvider } from "./i18n/LocaleContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <AppLocaleProvider>
          <App />
        </AppLocaleProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
