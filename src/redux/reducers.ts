import { combineReducers } from "redux";
import notificationReducer from "@/redux/slices/notification";
import workspaceReducer from "@/redux/slices/workspace";
import propertiesReducer from "@/redux/slices/properties";
import utilitiesReducer from "@/redux/slices/utilities";
import userReducer from "@/redux/slices/user";

const rootReducer = combineReducers({
  notificationReducer,
  workspaceReducer,
  propertiesReducer,
  utilitiesReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
