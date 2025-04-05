
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found. Can't mount React app.");
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
}

createRoot(document.getElementById("root")!).render(<App />);
