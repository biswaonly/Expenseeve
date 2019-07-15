import {
  ADD_NEW_EXPENSES,
  GET_EXPENSES,
  DELETE_EXPENSES,
  UNDO_DELETE_EXPENSES
} from "../actions/types";
import { ExpStoreState } from "../types/expenses";

const initialState = {
  data: []
};

export default function(state: ExpStoreState = initialState, action: any) {
  const { type, payload } = action;

  console.log(payload);

  switch (type) {
    case ADD_NEW_EXPENSES:
      return { ...state, data: [...state.data, payload] };
    case UNDO_DELETE_EXPENSES:
    case GET_EXPENSES:
      return { ...state, data: [...payload] };

    case DELETE_EXPENSES:
      let index = state.data.findIndex(e => e._id === payload);
      return {
        ...state,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)]
      };
    default:
      return state;
  }
}
