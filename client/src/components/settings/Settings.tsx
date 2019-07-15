import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateTotalExp, updateNewCategories } from "../../actions/budget";
import CatTable from "./CatTable";
import "./settings.css";
import { setAlert } from "../../actions/alert";

interface Props {
  _id: string;
  updateTotalExp: any;
  updateNewCategories: any;
  amount: number;
  setAlert: any;
}
interface IState {
  budgetAmount: number | undefined;
  category: string;
}

const Settings: React.SFC<Props> = ({
  _id,
  updateTotalExp,
  updateNewCategories,
  amount,
  setAlert
}) => {
  // Set State
  const [state, setState] = useState<IState>({
    budgetAmount: undefined,
    category: ""
  });
  const { budgetAmount, category } = state;

  // Component Will Receive Props
  useEffect(() => {
    setState({ ...state, budgetAmount: amount });
  }, [amount]);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, budgetAmount: parseInt(e.target.value) });
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, category: e.target.value });
  };

  // Submit Buttons
  const onBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTotalExp(budgetAmount, _id);
  };
  const onCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setAlert("Category is Empty", "danger");
    } else {
      updateNewCategories(category, _id);
      setState({ ...state, category: "" });
    }
  };
  return (
    <Fragment>
      <div className="settings">
        <form className="settings-form" onSubmit={e => onBudgetSubmit(e)}>
          <label>Total Budget</label>
          <input
            className="settings-form-input"
            type="number"
            name="budgetAmount"
            value={budgetAmount}
            onChange={e => onAmountChange(e)}
          />
          <input type="submit" value="UPDATE" />
        </form>
        <form className="settings-form" onSubmit={e => onCategorySubmit(e)}>
          <label>Categories</label>
          <input
            className="settings-form-input"
            type="string"
            name="category"
            value={category}
            onChange={e => onCategoryChange(e)}
          />
          <input type="submit" value="ADD" />
        </form>
      </div>
      <CatTable />
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  _id: state.auth && state.auth.user ? state.auth.user._id : "",
  amount:
    state.budget.amount && state.budget.amount ? state.budget.amount : undefined
});

export default connect(
  mapStateToProps,
  { updateTotalExp, updateNewCategories, setAlert }
)(Settings);
