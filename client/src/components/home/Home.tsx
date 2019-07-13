import * as React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
// import Chart from "./Chart";
import Table from "./Table";
import AddNewExp from "./AddNewExp";

interface Props {
  isAuthenticated: boolean;
  categories: any[];
}

const Home: React.SFC<Props> = ({ categories }) => {
  return (
    <Fragment>
      {categories && categories.length > 0 ? (
        <Fragment>
          <AddNewExp />
          <Table />
        </Fragment>
      ) : (
        <Fragment>
          <h2>
            Please go to Settings <br />
            and Set Budget and Catagories
          </h2>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  categories: state.budget.categories && state.budget.categories
});

export default connect(mapStateToProps)(Home);
