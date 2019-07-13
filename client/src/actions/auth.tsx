import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import setAuthToken from "../utils/setAuthToken";
import { loadBudget } from "./budget";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "./types";
import { setAlert } from "./alert";
import Rest from "./Rest";

/* ===== LOAD USER ====== */
export const loadUser = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await Rest.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    dispatch(loadBudget(res.data._id));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

/* ===== REGISTER ===== */
export const register = (
  name: string,
  email: string,
  password: string,
  history: any
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  const body = JSON.stringify({ name, email, password });

  try {
    await Rest.post("/api/auth/register", body);

    // Redirect to Login after register
    history.push("/login");
  } catch (err) {
    // Error Alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

/* ===== LOGIN ===== */
export const login = (email: string, password: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res = await Rest.post("/api/auth", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    // Error Alerts
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
