import moment from "moment";

// Filters Reducer

const advanceFiltersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
};

export default (state = advanceFiltersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ADVANCE_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_ADVANCE_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_ADVANCE_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_ADVANCE_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_ADVANCE_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
