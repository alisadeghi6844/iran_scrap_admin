import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
        <App />
        <ToastContainer
          position="bottom-left"
          bodyStyle={{ fontFamily: "Estedad" }}
        />
    </Provider>
  </StrictMode>
);
