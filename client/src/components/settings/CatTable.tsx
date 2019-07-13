import React, { Fragment } from "react";
import { connect } from "react-redux";
import CatCard from "./CatCard";

interface Props {
  categories: any[];
}

const CateTable: React.SFC<Props> = ({ categories }) => {
  console.log("CatTable", categories);

  return (
    <Fragment>
      <p>Available Categories</p>
      <div className="category_list">
        <div>
          {categories &&
            categories.map(item => <CatCard key={item} item={item} />)}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  categories: state.budget && state.budget.categories
});

export default connect(mapStateToProps)(CateTable);
