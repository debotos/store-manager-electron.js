import {
  INCREMENT_MEMO_NUMBER,
  START_SET_MEMO_NUMBER
} from "../../actions/constants";

export default (state = { id: "", memoNumber: 1 }, action) => {
  switch (action.type) {
    case INCREMENT_MEMO_NUMBER:
      return action.data;
    case START_SET_MEMO_NUMBER:
      return action.data;
    default:
      return state;
  }
};
