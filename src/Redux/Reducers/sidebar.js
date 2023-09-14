import { TOGGLE_SIDEBAR } from "../Actions/Types";

const initialState = {
  open: false,
};

export default function sidebar(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
}
