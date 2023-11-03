import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import Children from "../../types/children";
import skillsReducer, { skillsName } from "../slices/skills";
import educationReducer, { educationName } from "../slices/education";

const reducer = {
  [skillsName]: skillsReducer,
  [educationName]: educationReducer,
};

export const Store = configureStore({ reducer });

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
