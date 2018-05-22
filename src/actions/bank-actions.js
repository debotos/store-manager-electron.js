import {
  ADD_BANK,
  REMOVE_BANK,
  DEPOSIT_MONEY_TO_BANK_ACCOUNT,
  WITHDRAW_MONEY_FROM_BANK_ACCOUNT
} from "./constants";

export const addBank = (name, account_number) => {
  return {
    type: ADD_BANK,
    data: {
      bank_name: name,
      bank_account_number: account_number,
      amount: 0
    }
  };
};

export const removeBank = account_number => {
  return {
    type: REMOVE_BANK,
    data: {
      bank_account_number: account_number
    }
  };
};

export const depositMoneyToBankAccount = (bank_account_number, amount) => {
  return {
    type: DEPOSIT_MONEY_TO_BANK_ACCOUNT,
    data: {
      bank_account_number,
      amount
    }
  };
};

export const withdrawMoneyFromBankAccount = (bank_account_number, amount) => {
  return {
    type: WITHDRAW_MONEY_FROM_BANK_ACCOUNT,
    data: {
      bank_account_number,
      amount
    }
  };
};
