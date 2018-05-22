import {
  ADD_A_SELL_ITEM,
  REMOVE_A_SELL_ITEM,
  REMOVE_ALL_SELL_ITEMS,
  MAKE_EMPTY_A_SELL_ITEMS
} from "../../actions/constants";

const getDate = () => {
  var time = new Date();
  time = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
  let finalDate = `${Date()
    .substr(0, 15)
    .toString()} ${time}`;
  return finalDate;
};

const sellsReducerDefaultState = {
  aluminium: [],
  glass: [],
  ss: [],
  others: [],
  date: getDate()
};

export const sellsReducer = (state = sellsReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_A_SELL_ITEM:
      if (action.data.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: [...state.aluminium, action.data],
          date: getDate()
        };
      }
      if (action.data.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: [...state.glass, action.data],
          date: getDate()
        };
      }
      if (action.data.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: [...state.ss, action.data],
          date: getDate()
        };
      }
      if (action.data.productCategoryToSell === "others") {
        return {
          ...state,
          others: [...state.others, action.data],
          date: getDate()
        };
      }
    case REMOVE_A_SELL_ITEM:
      if (action.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: state.aluminium.filter(
            singleSell => singleSell.id !== action.id
          ),
          date: getDate()
        };
      }
      if (action.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: state.glass.filter(singleSell => singleSell.id !== action.id),
          date: getDate()
        };
      }
      if (action.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: state.ss.filter(singleSell => singleSell.id !== action.id),
          date: getDate()
        };
      }
      if (action.productCategoryToSell === "others") {
        return {
          ...state,
          others: state.others.filter(
            singleSell => singleSell.id !== action.id
          ),
          date: getDate()
        };
      }
    case MAKE_EMPTY_A_SELL_ITEMS:
      if (action.category === "aluminium") {
        return {
          ...state,
          aluminium: [],
          date: getDate()
        };
      }
      if (action.category === "glass") {
        return {
          ...state,
          glass: [],
          date: getDate()
        };
      }
      if (action.category === "ss") {
        return {
          ...state,
          ss: [],
          date: getDate()
        };
      }
      if (action.category === "others") {
        return {
          ...state,
          others: [],
          date: getDate()
        };
      }
    case REMOVE_ALL_SELL_ITEMS:
      return sellsReducerDefaultState;
    default:
      return state;
  }
};
