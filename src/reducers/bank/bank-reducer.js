import {
  ADD_BANK,
  REMOVE_BANK,
  DEPOSIT_MONEY_TO_BANK_ACCOUNT,
  WITHDRAW_MONEY_FROM_BANK_ACCOUNT
} from "../../actions/constants";

const addBankDefaultState = [];

const adder = (before, after) => {
  console.log('Action Deposit:', before, after);
  return parseFloat(before + after).toFixed(2);
};

export const bankReducer = (state = addBankDefaultState, action) => {
  switch (action.type) {
    case ADD_BANK:
      return [...state, action.data];
    case REMOVE_BANK:
      return state.filter(
        singleBank =>
          singleBank.bank_account_number !== action.data.bank_account_number
      );
    case DEPOSIT_MONEY_TO_BANK_ACCOUNT:
      return state.map(bank => {
        if (bank.bank_account_number === action.data.bank_account_number) {
          bank.amount = adder(
            parseFloat(bank.amount),
            parseFloat(action.data.amount)
          );
        }
        return bank;
      });
    case WITHDRAW_MONEY_FROM_BANK_ACCOUNT:
      return state.map(bank => {
        if (bank.bank_account_number === action.data.bank_account_number) {
          bank.amount = parseFloat(bank.amount) - parseFloat(action.data.amount);
        }
        return bank;
      });
    default:
      return state;
  }
};
