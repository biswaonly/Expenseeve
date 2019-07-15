import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
  path: string;
  component: any;
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
  };
  exact?: boolean;
}

const PrivateRoute: React.SFC<Props> = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...rest} />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
