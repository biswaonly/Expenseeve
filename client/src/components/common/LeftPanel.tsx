import React from "react";
import { connect } from "react-redux";
import "./common.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  isAuthenticated: boolean;
}

const LeftPanel: React.SFC<Props> = ({ history, isAuthenticated }) => {
  const arr = isAuthenticated
    ? ["Home", "Settings", "Profile"]
    : ["Login", "Register"];
  const onClick = (ele: string) => {
    ele === "Home" ? history.push("/") : history.push(`/${ele.toLowerCase()}`);
  };
  return (
    <div className="left-panel">
      {arr.map(ele => (
        <div className="left-panel-ele" key={ele} onClick={() => onClick(ele)}>
          {ele}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(LeftPanel));
