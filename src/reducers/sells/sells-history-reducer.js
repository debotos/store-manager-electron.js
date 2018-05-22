import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY,
  SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_ALL_HISTORY_OF_THIS_NUMBER
} from "../../actions/constants";

const sellsHistoryDefaultReducer = {};

export const sellsHistoryReducer = (
  state = sellsHistoryDefaultReducer,
  action
) => {
  switch (action.type) {
    case DELETE_ALL_HISTORY_OF_THIS_NUMBER:
      delete state[action.number];
      return { ...state };
    case DELETE_SELL_UNDER_CUSTOMER_HISTORY:
      let number = action.number;
      if (state[number].history.length === 1) {
        delete state[number];
        return { ...state };
      } else {
        return {
          ...state,
          [number]: {
            history: state[number].history.filter(
              singleSell => singleSell.id !== action.id
            )
          }
        };
      }

    case ADD_SELL_UNDER_CUSTOMER_HISTORY:
      let objectSize = Object.keys(state).length;
      if (objectSize > 0) {
        let flag = false;
        for (let number in state) {
          if (number === action.data.number) {
            console.log("Same number");
            flag = true;
          }
        }
        if (flag) {
          const number = action.data.number;
          return {
            ...state,
            [number]: {
              history: [action.data.history, ...state[number].history],
              id: action.data.id
            }
          }; // concentrate! you learned a lot from here debotos
        } else {
          const newNumber = action.data.number;
          return {
            ...state,
            [newNumber]: {
              history: [action.data.history],
              id: action.data.id
            }
          };
        }
      } else {
        const newNumber = action.data.number;
        return {
          ...state,
          [newNumber]: {
            history: [action.data.history],
            id: action.data.id
          }
        };
      }
    case SET_ADD_SELL_UNDER_CUSTOMER_HISTORY:
      return action.data;
    default:
      return state;
  }
};
