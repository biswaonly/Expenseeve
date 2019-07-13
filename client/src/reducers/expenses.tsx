import { ADD_NEW_EXPENSES, GET_EXPENSES } from "../actions/types";
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

    case GET_EXPENSES:
      return { ...state, data: [...payload] };
    default:
      return state;
  }
}
