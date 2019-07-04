import axios from "axios";
import { setAlert } from "./alert";
import {
  CHANGE_CATEGORY,
  POST_ERROR,
  SET_TOTAL_EXP,
  LOAD_BUDGET,
  CHANGE_PROPS
} from "./types";

export const changePropsData = obj => dispatch => {
  dispatch({
    type: CHANGE_PROPS,
    payload: obj
  });
};

export const loadBudget = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ id });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/budget",
      body,
      config
    );
    dispatch({
      type: LOAD_BUDGET,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateTotalExp = (amount, id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ amount, id });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/budget/total-exp",
      body,
      config
    );
    console.log("AMOUNT ACTION RES", res);

    dispatch({
      type: SET_TOTAL_EXP,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR
    });
  }
};

export const updateNewCategories = (category, id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ category, id });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/budget/categories",
      body,
      config
    );
    console.log(res.data);

    dispatch({
      type: CHANGE_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR
    });
  }
};
