import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MapReducer from "./MapReducer";

const rootReducer = combineReducers({
  // 여러개의 리듀서를 하나로 통합
  LoadingReducer,
  MapReducer,
});

export default rootReducer;
