import { SET_DUE_TEXT_FILTER } from '../constants';

export const setDueTextFilter = (text = '') => ({
  type: SET_DUE_TEXT_FILTER,
  text
})

// Main actions related due in the /actions/sells/ folder