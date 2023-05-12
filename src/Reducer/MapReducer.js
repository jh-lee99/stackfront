const initialState = {
  mapPlace: { lat: 37.55998, lng: 126.9858296 },
};

const LOAD_MAPPLACE = "LOAD_MAPPLACE";

export const loadPlace = (location) => ({
  type: LOAD_MAPPLACE,
  mapPlace: location,
});

export default function MapReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MAPPLACE:
      return {
        ...state,
        mapPlace: action.mapPlace,
      };
    default:
      return state;
  }
}
