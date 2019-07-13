import React, { useState } from "react";
import CatCardEdit from "./CatCardEdit";
import CatCardView from "./CatCardView";
import "./settings.css";

interface Props {
  item: string;
}

const CatCard: React.SFC<Props> = ({ item }) => {
  const [state, setState] = useState({
    showInput: false,
    inVal: item
  });

  const { showInput, inVal } = state;

  const editCategory = () => {
    setState({ ...state, showInput: true });
  };

  const hideInputField = () => {
    setState({ ...state, showInput: false });
  };

  const inputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, inVal: e.target.value });
  };

  return (
    <div className="cat-card">
      {showInput ? (
        <CatCardEdit
          inputField={inputField}
          inVal={inVal}
          hideInputField={hideInputField}
          item={item}
        />
      ) : (
        <CatCardView editCategory={editCategory} item={item} />
      )}
    </div>
  );
};

export default CatCard;
