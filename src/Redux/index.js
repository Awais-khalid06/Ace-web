import { combineReducers } from "@reduxjs/toolkit";
//Import All Reducers
//import authReducer from './auth';
import ACEDataReducer from "./ACEDataSlice";
const reducers = combineReducers({
  Data: ACEDataReducer,
  //   cart: cartReducer,
  //   bussiness: bussinessReducer,
  //   shopper: shopperReducer,
  //   app: appReducer,
});
export default reducers;
