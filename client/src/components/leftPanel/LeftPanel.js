import React from "react";
import PropTypes from "prop-types";
import "./leftPanel.css";
import { connect } from "react-redux";
import { LeftPanelT, LeftPanelBtn } from "../Style";
import { withRouter } from "react-router-dom";

const LeftPanel = ({ history, isAuthenticated }) => {
  const arr = isAuthenticated
    ? ["Home", "Settings", "Profile"]
    : ["Login", "Register"];
  const onClick = ele => {
    ele === "Home" ? history.push("/") : history.push(`/${ele.toLowerCase()}`);
  };
  return (
    <LeftPanelT>
      {arr.map(ele => (
        <LeftPanelBtn key={ele} onClick={() => onClick(ele)}>
          {ele}
        </LeftPanelBtn>
      ))}
    </LeftPanelT>
  );
};

LeftPanel.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(LeftPanel));
