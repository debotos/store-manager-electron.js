import { ADD_A_TABLE, REMOVE_ALL_TABLE } from "../constants";

export const addTable = tableData => {
  return {
    type: ADD_A_TABLE,
    tableData
  };
};

export const removeAllTable = () => ({
  type: REMOVE_ALL_TABLE
});
