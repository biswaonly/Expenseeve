import React, { Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { deleteCategory } from "../../actions/budget";
import "./settings.css";

interface Props {
  item: string;
  editCategory: any;
  _id: string;
  deleteCategory: any;
}

const CatCardView: React.SFC<Props> = ({
  item,
  editCategory,
  _id,
  deleteCategory
}) => {
  const delCat = () => {
    deleteCategory(item, _id);
  };
  return (
    <Fragment>
      <div className="cat-card-name">{item}</div>
      <div className="cat-card-icon" onClick={editCategory}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <div className="cat-card-icon" onClick={delCat}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  _id: state.auth.user._id
});

export default connect(
  mapStateToProps,
  { deleteCategory }
)(CatCardView);
