import { BudgetStoreState } from "../types/budget";
import {
  SET_TOTAL_EXP,
  LOAD_BUDGET,
  CHANGE_CATEGORY,
  POST_ERROR,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  UNDO_DELETE_CATEGORY
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
    case LOAD_BUDGET:
      return {
        ...state,
        amount: payload.amount,
        categories: payload.categories
      };

    case SET_TOTAL_EXP:
    case CHANGE_CATEGORY:
    case UNDO_DELETE_CATEGORY:
    case EDIT_CATEGORY:
      return { ...state, categories: [...payload] };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(e => e !== payload)
      };

    case POST_ERROR:
      return { ...state, amount: 0 };

    default:
      return state;
  }
}
