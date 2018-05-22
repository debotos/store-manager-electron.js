import { ADD_A_PREV_DUE, SET_DUE, REMOVE_A_PREV_DUE, UPDATE_A_PREV_DUE } from "../../actions/constants";

const prevDueDefaultState = [];

export const prevDueReducer = (state = prevDueDefaultState, action) => {
  switch (action.type) {
    case ADD_A_PREV_DUE:
      if (state.length > 0) {
        let flag = false;
        state.forEach(singleItem => {
          if (singleItem.number.toString() === action.data.number.toString()) {
            flag = true;
          }
        });
        if (flag) {
          return state.map(singleItem => {
            if (singleItem.number.toString() === action.data.number.toString()) {
              return { ...action.data };
            } else {
              return singleItem;
            }
          });
        } else {
          return [...state, action.data];
        }
      } else {
        return [...state, action.data];
      }
    case UPDATE_A_PREV_DUE:
      return state.map(singleItem => {
        if (singleItem.id === action.id) {
          return { ...action.data };
        } else {
          return singleItem;
        }
      });
    case REMOVE_A_PREV_DUE:
      return state.filter(({ id }) => id !== action.id);
    case SET_DUE:
      return action.data;
    default:
      return state;
  }
};
