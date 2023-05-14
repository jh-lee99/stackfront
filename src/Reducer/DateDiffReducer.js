const initialState = {
  date: 0,
};

const DATE_DIFF = "DATE_DIFF";

export const dateDiff = (diff) => ({
  type: DATE_DIFF,
  date: diff,
});

export default function DateDiffReducer(state = initialState, action) {
  switch (action.type) {
    case DATE_DIFF:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
