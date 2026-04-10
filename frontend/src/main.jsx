import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import{BrowserRouter, Route, Routes} from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ShopContextProvider>
    <App/>
    
  </ShopContextProvider>

</BrowserRouter>
  );