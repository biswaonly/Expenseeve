import * as React from "react";
import { Fragment, useState } from "react";
import ExpBtn from "./ExpBtn";
import ExpForm from "./ExpForm";

interface Props {}

const AddNewExp: React.SFC<Props> = () => {
  const [state, setState] = useState({
    newExpShow: false
  });
  const funcExpShow = () => {
    setState({ ...state, newExpShow: true });
  };
  const funcExpHide = () => {
    setState({ ...state, newExpShow: false });
  };

  return (
    <Fragment>
      {!state.newExpShow ? (
        <ExpBtn funcExpShow={funcExpShow} />
      ) : (
        <ExpForm funcExpHide={funcExpHide} />
      )}
    </Fragment>
  );
};

export default AddNewExp;
