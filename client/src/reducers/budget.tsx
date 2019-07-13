import { BudgetStoreState } from "../types/budget";
import {
  SET_TOTAL_EXP,
  LOAD_BUDGET,
  CHANGE_CATEGORY,
  POST_ERROR,
  EDIT_CATEGORY
} from "../actions/types";

const initialState = {
  amount: 0,
  categories: [],
  totalExpend: 0,
  editInputField: false
};

export default function(state: BudgetStoreState = initialState, action: any) {
  const { type, payload } = action;

  console.log(payload);

  switch (type) {
    case SET_TOTAL_EXP:
      return { ...state, amount: payload };

    case LOAD_BUDGET:
      return {
        ...state,
        amount: payload.amount,
        categories: payload.categories
      };

    case CHANGE_CATEGORY:
      return { ...state, categories: [...payload] };

    case POST_ERROR:
      return {
        ...state,
        amount: 0
      };

    case EDIT_CATEGORY:
      return { ...state, categories: [...payload] };

    default:
      return state;
  }
}
