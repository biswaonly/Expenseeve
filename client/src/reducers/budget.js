import {
  SET_TOTAL_EXP,
  LOAD_BUDGET,
  CHANGE_CATEGORY,
  CHANGE_PROPS,
  POST_ERROR
} from "../actions/types";

const initialState = {
  amount: null,
  categories: [],
  showInput: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  console.log(payload);

  switch (type) {
    case SET_TOTAL_EXP:
      return {
        ...state,
        amount: payload
      };

    case LOAD_BUDGET:
      return {
        ...state,
        amount: payload.amount,
        categories: payload.categories
      };

    case CHANGE_CATEGORY:
      return { ...state, ...payload };

    case POST_ERROR:
      return {
        ...state,
        amount: null
      };
    default:
      return state;
  }
}
