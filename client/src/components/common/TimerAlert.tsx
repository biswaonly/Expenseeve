import React from "react";
import { connect } from "react-redux";
import "./common.css";
import { instantRemoveAlert } from "../../actions/timerAlert";

interface Props {
  timerAlerts: any;
  instantRemoveAlert: any;
  userID: string;
}

const Alert: React.SFC<Props> = ({
  timerAlerts,
  instantRemoveAlert,
  userID
}) => {
  const undoThatThing = (id: string) => {
    console.log("UNDO BTN CLICKED");
    instantRemoveAlert(id, userID);
  };
  return (
    timerAlerts !== null &&
    timerAlerts.length > 0 &&
    timerAlerts.map((alertElement: any) => (
      <div className="alert" key={alertElement.id}>
        <p>You can undo now</p>
        <input
          type="button"
          value="undo"
          onClick={() => undoThatThing(alertElement.id)}
        />
      </div>
    ))
  );
};

const mapStateToProps = (state: any) => ({
  timerAlerts: state.timerAlert,
  userID: state.auth.user._id
});

export default connect(
  mapStateToProps,
  { instantRemoveAlert }
)(Alert);
