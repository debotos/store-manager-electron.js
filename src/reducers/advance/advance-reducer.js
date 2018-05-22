// Advances Reducer

const advancesReducerDefaultState = [];

export default (state = advancesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_ADVANCE":
      return [...state, action.advance];
    case "REMOVE_ADVANCE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_ADVANCE":
      return state.map(advance => {
        if (advance.id === action.id) {
          return {
            ...advance,
            ...action.updates
          };
        } else {
          return advance;
        }
      });
    case "SET_ADVANCES":
      return action.advances;
    default:
      return state;
  }
};
