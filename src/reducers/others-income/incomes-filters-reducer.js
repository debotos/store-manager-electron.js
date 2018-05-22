import moment from "moment";

// Filters Reducer

const incomeFiltersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
};

export default (state = incomeFiltersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_INCOME_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_INCOME_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_INCOME_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_INCOME_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_INCOME_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
