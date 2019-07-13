import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./home.css";

interface Props {
  item: {
    category: string;
    itemName: string;
    date: string;
    price: number;
  };
}

const TableCards: React.SFC<Props> = ({ item }) => {
  return (
    <div className="table-cards">
      <div className="table-cards-icon">
        <FontAwesomeIcon className="header_back" icon={faPen} />
      </div>
      <div>{item.category}</div>
      <div>{item.itemName}</div>
      <div>40</div>
      <div>23/23/2323</div>
      <div className="table-cards-icon">
        <FontAwesomeIcon className="header_back" icon={faUpload} />
      </div>
      <div className="table-cards-icon">
        <FontAwesomeIcon className="header_back" icon={faTrashAlt} />
      </div>
    </div>
  );
};

export default TableCards;
