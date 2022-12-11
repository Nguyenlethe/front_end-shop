import { combineReducers } from "redux";
// import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import sellerReducer from "./sellerReducer";

// eslint-disable-next-line import/no-anonymous-default-export
export default combineReducers({
  user: userReducer,
  app: appReducer,
  seller: sellerReducer,
  admin: adminReducer,
});
