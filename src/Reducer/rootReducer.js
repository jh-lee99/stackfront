import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MapReducer from "./MapReducer";
import DateDiffReducer from "./DateDiffReducer";
import UpdateUserReducer from "./UpdateUserReducer";
import UserNameReducer from "./UserNameReducer";

const rootReducer = combineReducers({
  // 여러개의 리듀서를 하나로 통합
  LoadingReducer,
  MapReducer,
  DateDiffReducer,
  UpdateUserReducer,
  UserNameReducer,
});

export default rootReducer;
