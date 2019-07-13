import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCategory } from "../../actions/budget";

interface Props {
  inputField: any;
  inVal: string;
  hideInputField: any;
  editCategory: any;
  item: string;
  _id: string;
}

const CatCardEdit: React.SFC<Props> = ({
  inputField,
  inVal,
  hideInputField,
  editCategory,
  item,
  _id
}) => {
  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editCategory(item, inVal, _id);
  };
  return (
    <form onSubmit={e => formSubmit(e)}>
      <input
        type="text"
        value={inVal}
        onChange={e => inputField(e)}
        autoFocus
      />
      <input type="submit" value="Update" />
      <input type="button" value="Cancel" onClick={hideInputField} />
    </form>
  );
};

CatCardEdit.propTypes = {
  editCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state: any) => ({
  _id: state.auth.user._id
});

export default connect(
  mapStateToProps,
  { editCategory }
)(CatCardEdit);
