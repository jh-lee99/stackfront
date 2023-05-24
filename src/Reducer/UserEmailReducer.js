const initialState = {
  email: "",
};

const USER_EMAIL = "USER_EMAIL";

export const setUserEmail = (email) => ({
  type: USER_EMAIL,
  email: email,
});

export default function UserEmailReducer(state = initialState, action) {
  switch (action.type) {
    case USER_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
}
