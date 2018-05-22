import {
  ADD_A_SELL_ITEM,
  REMOVE_A_SELL_ITEM,
  REMOVE_ALL_SELL_ITEMS,
  MAKE_EMPTY_A_SELL_ITEMS
} from "../constants";

export const addSellItem = data => ({
  type: ADD_A_SELL_ITEM,
  data
});

export const makeEmptySellItem = category => ({
  type: MAKE_EMPTY_A_SELL_ITEMS,
  category
});

export const removeSellItem = (id, productCategoryToSell) => ({
  type: REMOVE_A_SELL_ITEM,
  id,
  productCategoryToSell
});

export const removeAllSellsItem = () => ({
  type: REMOVE_ALL_SELL_ITEMS
});
