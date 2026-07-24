import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import applicationsReducer from "./applicationsSlice";

export default configureStore({
  reducer: { auth: authReducer, applications: applicationsReducer },
});
