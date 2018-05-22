import { ADD_A_TABLE, REMOVE_ALL_TABLE } from "../../actions/constants";

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
const tableReducerDefaultState = {
  aluminium: [],
  glass: [],
  ss: [],
  others: [],
  date: getDate()
};

export const tableReducer = (state = tableReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_A_TABLE:
      if (action.tableData.category === "aluminium") {
        return {
          ...state,
          aluminium: [...state["aluminium"], action.tableData.data],
          date: getDate()
        };
      }
      if (action.tableData.category === "glass") {
        return {
          ...state,
          glass: [...state["glass"], action.tableData.data],
          date: getDate()
        };
      }
      if (action.tableData.category === "ss") {
        return {
          ...state,
          ss: [...state["ss"], action.tableData.data],
          date: getDate()
        };
      }
      if (action.tableData.category === "others") {
        return {
          ...state,
          others: [...state["others"], action.tableData.data],
          date: getDate()
        };
      }
    case REMOVE_ALL_TABLE:
      return tableReducerDefaultState;
    default:
      return state;
  }
};
