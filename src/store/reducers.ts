import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/reducers";
import garageReducer from "./garage/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  garage: garageReducer,
});

export default rootReducer;
