
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";

  // index.css import removed to avoid duplicate global styles after merging into main.
  createRoot(document.getElementById("root")!).render(<App />);
  