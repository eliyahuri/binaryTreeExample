import "./i18n";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Entry point of the React application.
 * Renders the root <App /> component into the DOM element with id 'root'.
 */
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
