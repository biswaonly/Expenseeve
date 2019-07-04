import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SettingFrom, FormDiv, FromLabel, FormIP, NoInput } from "../Style";
import { updateTotalExp, updateNewCategories } from "../../actions/budget";
import { connect } from "react-redux";
import CateTable from "./CateTable";

const Settings = ({ _id, updateTotalExp, updateNewCategories, amount }) => {
  const [state, setState] = useState({
    budgetAmount: "",
    category: ""
  });
  const { budgetAmount, category } = state;

  useEffect(() => {
    console.log("count changed", amount);
    setState({
      ...state,
      budgetAmount: amount
    });
  }, [amount]);

  const onAmountChange = e => {
    setState({
      ...state,
      budgetAmount: e.target.value.replace(/[^0-9]/g, "")
    });
  };
  const onChange = e => {
    setState({
      ...state,
      category: e.target.value
    });
  };
  const onBudgetSubmit = e => {
    e.preventDefault();
    updateTotalExp(budgetAmount, _id);
  };
  const onCategorySubmit = e => {
    e.preventDefault();
    updateNewCategories(category, _id);
    console.log("ON SUBMIT");
  };
  return (
    <Fragment>
      <FormDiv>
        <SettingFrom onSubmit={e => onBudgetSubmit(e)}>
          <FromLabel>Total Budget</FromLabel>
          <FormIP
            type="text"
            name="budgetAmount"
            value={budgetAmount}
            onChange={e => onAmountChange(e)}
          />
          <input type="submit" value="UPDATE" />
        </SettingFrom>
        <SettingFrom onSubmit={e => onCategorySubmit(e)}>
          <FromLabel>Categories</FromLabel>
          <FormIP
            type="string"
            name="category"
            value={category}
            onChange={e => onChange(e)}
          />
          <input type="submit" value="ADD" />
        </SettingFrom>
      </FormDiv>
      <CateTable />
    </Fragment>
  );
};

Settings.propTypes = {
  updateTotalExp: PropTypes.func.isRequired,
  updateNewCategories: PropTypes.func.isRequired,
  amount: PropTypes.number,
  _id: PropTypes.string
};

const mapStateToProps = state => ({
  _id: state.auth && state.auth.user ? state.auth.user._id : "",
  amount: state.budget && state.budget.amount
});

export default connect(
  mapStateToProps,
  { updateTotalExp, updateNewCategories }
)(Settings);
