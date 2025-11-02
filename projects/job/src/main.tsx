
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";

  // index.css import removed to avoid duplicate global styles after merging into main.
  // Backup original file if needed: ./index.css
  createRoot(document.getElementById("root")!).render(<App />);
  