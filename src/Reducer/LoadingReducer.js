const initialState = {
  // 초기 상태값
  isLoading: false,
};

const LOADING_START = "LOADING_START";
const LOADING_FINISH = "LOADING_FINISH";

export const startLoading = () => ({
  type: LOADING_START,
});

export const finishLoading = () => ({
  type: LOADING_FINISH,
});

export default function LoadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_FINISH:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
