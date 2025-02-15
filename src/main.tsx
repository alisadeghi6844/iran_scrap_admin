import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./context/SocketContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <ToastContainer
          position="bottom-left"
          bodyStyle={{ fontFamily: "Estedad" }}
        />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
// ثبت سرویس ورکر
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('../service-worker.js')
          .then(registration => {
              console.log('ServiceWorker registered with scope:', registration.scope);
          })
          .catch(error => {
              console.error('ServiceWorker registration failed:', error);
          });
  });
}