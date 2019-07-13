import React, { Fragment } from "react";
import "./home.css";

interface Props {
  funcExpShow: any;
}

const ExpBtn: React.SFC<Props> = ({ funcExpShow }) => {
  return (
    <Fragment>
      <div className="exp-btn">
        <input
          className="add-exp-btn"
          type="button"
          value="Add Expense"
          onClick={funcExpShow}
        />
      </div>
    </Fragment>
  );
};

export default ExpBtn;
