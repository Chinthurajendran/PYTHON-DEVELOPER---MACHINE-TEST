import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

import Store, { persistor } from "./store/Store.jsx"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
