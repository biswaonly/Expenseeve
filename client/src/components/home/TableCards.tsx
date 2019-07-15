import * as React from "react";
import { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { deleteExpenses } from "../../actions/expenses";
import { connect } from "react-redux";

interface Props {
  item: {
    _id: String;
    category: string;
    itemName: string;
    date: string;
    price: number;
    image: string;
  };
  deleteExpenses: any;
  uid: string;
}

const TableCards: React.SFC<Props> = ({ item, deleteExpenses, uid }) => {
  const [state, setState] = useState({
    editIt: false
  });

  const editExpence = (id: string) => {

    setState({ ...state, editIt: true });
  };
  const deleteExpence = (id: string) => {
    deleteExpenses(id);
  };
  const openImage = () => {
    window.open(item.image, "_blank");
  };
  const notClicked = () => {};
  return (
    <Fragment>
      {!state.editIt ? (
        <div className="table-cards">
          <div className="table-cards-icon" onClick={() => editExpence(uid)}>
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div>{item.category}</div>
          <div>{item.itemName}</div>
          <div>{item.price}</div>
          <div>23/23/2323</div>
          <div
            className="table-cards-icon"
            onClick={item.image ? openImage : notClicked}
          >
            <FontAwesomeIcon
              className={item.image ? "i_have_image" : ""}
              icon={faUpload}
            />
          </div>
          <div className="table-cards-icon" onClick={() => deleteExpence(uid)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      ) : (
        <div>
          <h3>Edit</h3>
        </div>
      )}
    </Fragment>
  );
};

// const mapStateToProps = (state: any) => ({});

export default connect(
  null,
  { deleteExpenses }
)(TableCards);
