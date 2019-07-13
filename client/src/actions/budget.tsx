import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setAlert } from "./alert";
import Rest from "./Rest";
import { loadExpenses } from "./expenses";
import {
  CHANGE_CATEGORY,
  POST_ERROR,
  SET_TOTAL_EXP,
  LOAD_BUDGET,
  EDIT_CATEGORY
} from "./types";

export const loadBudget = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.post("/api/budget", { id });

    dispatch({
      type: LOAD_BUDGET,
      payload: res.data
    });
    dispatch(loadExpenses(id));
  } catch (err) {
    console.error(err);
  }
};

export const updateTotalExp = (amount: number, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const body = JSON.stringify({ amount, id });

  try {
    const res = await Rest.post("/api/budget/total-exp", body);
    console.log("AMOUNT ACTION RES", res);

    dispatch({
      type: SET_TOTAL_EXP,
      payload: res.data
    });
  } catch (err) {
    // Error Alerts
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR
    });
  }
};

export const updateNewCategories = (category: string, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const body = JSON.stringify({ category, id });

  try {
    const res = await Rest.post("/api/budget/categories", body);
    console.log(res.data);

    dispatch({
      type: CHANGE_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR
    });
  }
};

export const editCategory = (
  oldCat: string,
  newCat: string,
  id: string
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const body = JSON.stringify({ oldCat, newCat, id });

  try {
    const res = await Rest.post("/api/budget/edit-cat", body);

    console.log("RES === === == ", res.data);

    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    // Error Alerts
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// DELETE ONE CATEGORY
export const deleteCategory = (category: string, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.post("/api/budget/del-cat", { category, id });

    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    // Error Alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
