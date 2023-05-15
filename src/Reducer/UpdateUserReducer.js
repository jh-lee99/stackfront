const initialState = {
  mode: "selecUpdate",
};

const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const SELECT_UPDATE = "SELECT_UPDATE";

export const selectupdate = () => ({
  type: SELECT_UPDATE,
  mode: "selectUpdate",
});

export const updateUsername = () => ({
  type: UPDATE_USERNAME,
  mode: "updateUsername",
});

export const updateUserpassword = () => ({
  type: UPDATE_PASSWORD,
  mode: "updatePassword",
});

export default function UpdateUserReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_UPDATE:
      return {
        ...state,
        mode: action.mode,
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        mode: action.mode,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}
