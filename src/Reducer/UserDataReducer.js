const initialState = {
  userdata: {},
};

const USER_DATA = "USER_DATA";

export const setUserdata = (data) => ({
  type: USER_DATA,
  userdata: data,
});

export default function UserDataReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userdata: action.userdata,
      };
    default:
      return state;
  }
}
