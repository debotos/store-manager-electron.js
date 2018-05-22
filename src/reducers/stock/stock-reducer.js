import {
  REMOVE_ITEM_FROM_STOCK,
  ADD_ITEM_TO_STOCK,
  SET_STOCK,
  UPDATE_STOCK_ITEM
} from "../../actions/constants";

const stockReducerDefaultState = {
  aluminium: [],
  glass: [],
  ss: [],
  others: []
};

export const stockReducer = (state = stockReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_STOCK:
      if (action.data.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: [...state.aluminium, action.data]
        };
      }
      if (action.data.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: [...state.glass, action.data]
        };
      }
      if (action.data.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: [...state.ss, action.data]
        };
      }
      if (action.data.productCategoryToSell === "others") {
        return {
          ...state,
          others: [...state.others, action.data]
        };
      }
    case REMOVE_ITEM_FROM_STOCK:
      if (action.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: state.aluminium.filter(
            singleSell => singleSell.id !== action.id
          )
        };
      }
      if (action.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: state.glass.filter(singleSell => singleSell.id !== action.id)
        };
      }
      if (action.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: state.ss.filter(singleSell => singleSell.id !== action.id)
        };
      }
      if (action.productCategoryToSell === "others") {
        return {
          ...state,
          others: state.others.filter(singleSell => singleSell.id !== action.id)
        };
      }
    case UPDATE_STOCK_ITEM:
      if (action.data.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: state.aluminium.map(singleItem => {
            if (singleItem.id === action.id) {
              return action.data;
            } else {
              return singleItem;
            }
          })
        };
      }
      if (action.data.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: state.glass.map(singleItem => {
            if (singleItem.id === action.id) {
              return action.data;
            } else {
              return singleItem;
            }
          })
        };
      }
      if (action.data.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: state.ss.map(singleItem => {
            if (singleItem.id === action.id) {
              return action.data;
            } else {
              return singleItem;
            }
          })
        };
      }
      if (action.data.productCategoryToSell === "others") {
        return {
          ...state,
          others: state.others.map(singleItem => {
            if (singleItem.id === action.id) {
              return action.data;
            } else {
              return singleItem;
            }
          })
        };
      }
    case SET_STOCK:
      return action.data;
    default:
      return state;
  }
};
