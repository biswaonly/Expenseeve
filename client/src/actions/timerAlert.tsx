import uuid from "uuid";
import { SET_TIMER_ALERT, REMOVE_TIMER_ALERT } from "./types";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Rest from "./Rest";
import { undoDeleteCategory } from "./budget";
import { undoDeleteExpenses } from "./expenses";

var v: any;
interface win {
  [restType: string]: any;
}

export const setTimerAlert = (
  restType: string,
  link: string,
  timeout = 5000
) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    const id = uuid.v4();

    dispatch({
      type: SET_TIMER_ALERT,
      payload: { id }
    });
    // UNDO here
    v = setTimeout(async () => {
      const Fest: win = Rest;
      dispatch({ type: REMOVE_TIMER_ALERT, payload: id });
      await Fest[restType](`${link}`);
    }, timeout);
  } catch (err) {
    console.error(err);
  }
};

export const instantRemoveAlert = (id: string, userID: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    clearTimeout(v);
    dispatch(undoDeleteCategory(userID));
    dispatch(undoDeleteExpenses(userID));
    dispatch({
      type: REMOVE_TIMER_ALERT,
      payload: id
    });
  } catch (err) {
    console.log("ERRRRRRRRRRRRRRR");
  }
};
