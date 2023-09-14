import { TOGGLE_SIDEBAR } from "./Types";

export const toggleSidebar = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
};
