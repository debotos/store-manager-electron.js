// SET_TEXT_FILTER
export const setTextFilter = (text = "") => ({
  type: "SET_ADVANCE_TEXT_FILTER",
  text
});

// SORT_BY_DATE
export const sortByDate = () => ({
  type: "SORT_ADVANCE_BY_DATE"
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: "SORT_ADVANCE_BY_AMOUNT"
});

// SET_START_DATE
export const setStartDate = startDate => ({
  type: "SET_ADVANCE_START_DATE",
  startDate
});

// SET_END_DATE
export const setEndDate = endDate => ({
  type: "SET_ADVANCE_END_DATE",
  endDate
});
