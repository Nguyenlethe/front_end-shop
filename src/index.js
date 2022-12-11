import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import { ToastContainer } from "react-toastify";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReduce";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const reduxStore = createStore(rootReducer, applyMiddleware(thunk));

root.render(
 <Provider store={reduxStore}>
  <GlobalStyle>
   <BrowserRouter>
    <App />
    <ToastContainer
     position="bottom-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
    />
   </BrowserRouter>
  </GlobalStyle>
 </Provider>
);

