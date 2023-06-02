import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./locales/i18n"; // 国际化

import "antd/dist/reset.css";
import "./styles/index.css";

console.log("process.env", process.env);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log); // 会将生成的性能报告打印出来
