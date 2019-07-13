import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setAlert } from "./alert";
import { ADD_NEW_EXPENSES, GET_EXPENSES } from "./types";
import Rest from "./Rest";

export const addNewExpenses = (data: object) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const body = JSON.stringify(data);
  console.log(data);

  try {
    const res = await Rest.post("/api/expenses/add", body);
    console.log(res.data);

    dispatch({
      type: ADD_NEW_EXPENSES,
      payload: res.data
    });
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(err);
  }
};

export const loadExpenses = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  console.log(id);

  const body = JSON.stringify({ id });

  console.log("ID EXPENSES ACTION======/// ", id);

  try {
    const res = await Rest.post("/api/expenses/get-data", body);
    console.log("GET EXPENSES ACTION", res.data);

    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(err);
  }
};
