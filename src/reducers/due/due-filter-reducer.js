import { SET_DUE_TEXT_FILTER } from "../../actions/constants";

export default (state = { text: "" }, action) => {
  switch (action.type) {
    case SET_DUE_TEXT_FILTER:
      return { text: action.text };
    default:
      return state;
  }
};
