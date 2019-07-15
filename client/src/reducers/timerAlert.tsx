import { SET_TIMER_ALERT, REMOVE_TIMER_ALERT } from "../actions/types";

const initialState: any[] = [];

export default function(state: any[] = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_TIMER_ALERT:
      return [...state, payload];
    case REMOVE_TIMER_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
