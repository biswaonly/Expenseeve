import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setAlert } from "./alert";
import {
  ADD_NEW_EXPENSES,
  GET_EXPENSES,
  DELETE_EXPENSES,
  UNDO_DELETE_EXPENSES
} from "./types";
import Rest from "./Rest";
import { setTimerAlert } from "./timerAlert";

export const addNewExpenses = (data: object) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const body = JSON.stringify(data);

  try {
    const res = await Rest.post("/api/expenses", body);

    dispatch({
      type: ADD_NEW_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const loadExpenses = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.get(`/api/expenses/${id}`);

    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const deleteExpenses = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    dispatch({
      type: DELETE_EXPENSES,
      payload: id
    });
    dispatch(setTimerAlert("delete", `/api/expenses/delete/${id}`));
  } catch (err) {
    console.error(err);
  }
};

export const undoDeleteExpenses = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.get(`/api/expenses/${id}`);

    dispatch({
      type: UNDO_DELETE_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
