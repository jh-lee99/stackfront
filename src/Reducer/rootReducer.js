import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MapReducer from "./MapReducer";
import DateDiffReducer from "./DateDiffReducer";
import UpdateUserReducer from "./UpdateUserReducer";
import UserNameReducer from "./UserNameReducer";
import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import UserEmailReducer from "./UserEmailReducer";
const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["UserNameReducer"],
};

const rootReducer = combineReducers({
  // 여러개의 리듀서를 하나로 통합
  LoadingReducer,
  MapReducer,
  DateDiffReducer,
  UpdateUserReducer,
  UserNameReducer,
  UserEmailReducer,
});

export default persistReducer(persistConfig, rootReducer);
