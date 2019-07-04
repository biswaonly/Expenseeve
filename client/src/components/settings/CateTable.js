import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CateTable = ({ categories }) => {
  return (
    <Fragment>
      <p>Available Categories</p>
      <div className="category_list">
        <div>
          {categories.map(e => (
            <div key={e}>{e}</div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

CateTable.propTypes = {};

const mapStateToProps = state => ({
  categories: state.budget.categories
});

export default connect(mapStateToProps)(CateTable);
