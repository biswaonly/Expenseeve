import React from "react";
import { connect } from "react-redux";
import "./common.css";

interface Props {
  alerts: any;
}

const Alert: React.SFC<Props> = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alertElement: any) => (
      <div className="alert" key={alertElement.id}>
        {alertElement.msg}
      </div>
    ))
  );
};

const mapStateToProps = (state: any) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
