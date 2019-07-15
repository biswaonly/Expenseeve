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
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  UNDO_DELETE_CATEGORY
} from "./types";
import { setTimerAlert } from "./timerAlert";

// DID MOUNT CALL
export const loadBudget = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.get(`/api/budget/${id}`);

    dispatch({
      type: LOAD_BUDGET,
      payload: res.data
    });
    dispatch(loadExpenses(id));
  } catch (err) {
    console.error(err);
  }
};

// Add or Edit total budget amount
export const updateTotalExp = (amount: number, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const body = JSON.stringify({ amount, id });

  try {
    const res = await Rest.post("/api/budget", body);
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

// Add a new Category
export const updateNewCategories = (category: string, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.put(`/api/budget/${id}/${category}`);

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

// Edit Category
export const editCategory = (
  oldCat: string,
  newCat: string,
  id: string
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    const res = await Rest.put(
      `/api/budget/edit-cat/${id}/${oldCat}/${newCat}`
    );

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
    dispatch({
      type: DELETE_CATEGORY,
      payload: category
    });

    dispatch(setTimerAlert("delete", `/api/budget/${id}/${category}`));
  } catch (err) {
    console.error(err);
    // Error Alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// DELETE ONE CATEGORY
export const undoDeleteCategory = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.get(`/api/budget/${id}`);

    dispatch({
      type: UNDO_DELETE_CATEGORY,
      payload: res.data.categories
    });
  } catch (err) {
    console.error(err);
  }
};
