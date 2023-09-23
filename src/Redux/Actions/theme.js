import { CHANGE_THEME } from "./Types";

export const changeTheme = () => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
  });
};
