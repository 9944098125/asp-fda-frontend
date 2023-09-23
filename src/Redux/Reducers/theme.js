import { CHANGE_THEME } from "../Actions/Types";

const initialState = {
  dark: false,
};

export default function changeTheme(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        dark: !state.dark,
      };
    default:
      return state;
  }
}
