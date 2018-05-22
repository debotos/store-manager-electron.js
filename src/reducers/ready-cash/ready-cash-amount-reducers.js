import {
  UPDATE_READY_CASH_AMOUNT,
  SET_READY_CASH_AMOUNT,
  OVERRIDE_READY_CASH_AMOUNT
} from "../../actions/constants";

export const readyCashAmountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_READY_CASH_AMOUNT:
      return action.data;
    case SET_READY_CASH_AMOUNT:
      return action.data;
    case OVERRIDE_READY_CASH_AMOUNT:
      return action.data;
    default:
      return state;
  }
};
