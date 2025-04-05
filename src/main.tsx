
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found. Creating a new root element.");
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
}

// Add console log for debugging
console.log("Mounting React app to root element");
createRoot(document.getElementById("root")!).render(<App />);
