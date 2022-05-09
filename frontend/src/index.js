import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import App from "./App";
// import { Provider } from "react-redux";
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// //dev tools= nous aide a verrifier notre Store
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, logger))
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<Provider store={store}>
  //</Provider>,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
