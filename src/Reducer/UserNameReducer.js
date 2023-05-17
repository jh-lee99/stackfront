const initialState = {
  username: "",
};

const USER_NAME = "USER_NAME";

export const setUsername = (name) => ({
  type: USER_NAME,
  username: name,
});

export default function UserNameReducer(state = initialState, action) {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
}
