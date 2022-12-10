import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import LoadingView from "components/Loading";
import { persistor, store } from "redux/store";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

// import { createRoot } from "react-dom/client";

// const container = document.getElementById("root") as HTMLElement;

// const root = ReactDOM.createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<LoadingView duration={10} />}
        persistor={persistor}
      >
        <ColorModeScript />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
