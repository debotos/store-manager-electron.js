import { UPDATE_STORE_INFO, SET_STORE_INFO } from "../../actions/constants";

const storeInfoDefaultState = {};

export const storeInfoReducer = (state = storeInfoDefaultState, action) => {
  switch (action.type) {
    case UPDATE_STORE_INFO:
      return action.info;
    case SET_STORE_INFO:
      return action.data;
    default:
      return state;
  }
};
