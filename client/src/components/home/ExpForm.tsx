import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addNewExpenses } from "../../actions/expenses";
import "./home.css";

interface Props {
  funcExpHide: any;
  addNewExpenses: any;
  _id: string;
  categories: string[];
}
interface useStateInter {
  category: string;
  itemName: string;
  price: number;
  date: Date | any;
  userID: string;
  image: any;
}

const ExpForm: React.SFC<Props> = ({
  _id,
  categories,
  funcExpHide,
  addNewExpenses
}) => {
  const [state, setState] = useState<useStateInter>({
    category: categories[0],
    itemName: "",
    price: 0,
    date: new Date(),
    userID: _id,
    image: ""
  });

  const { category, itemName, price, date, image } = state;

  // Form Submit
  const createNewExp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);

    addNewExpenses(state);
    setState({ ...state, itemName: "", price: 0 });
  };

  // Set Category with Select Option
  const selectOption = (e: React.FormEvent) => {
    setState({ ...state, category: (e.target as any).value });
  };

  // Set Item Name
  const addItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, itemName: e.target.value });
  };

  // Set Item Price
  const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, price: parseInt(e.target.value) });
  };

  // set Purchase Date
  const addDate = (date: Date) => {
    setState({ ...state, date: date });
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, image: (e.target as any).files[0] });
    // console.log(image);
    let aa = (e.target as any).files[0];
    let data = new FormData();
    data.append("inputname", image);
    console.log(data.get("inputname"));
  };
  return (
    <form className="exp-form" onSubmit={e => createNewExp(e)}>
      <input type="button" value="Clear" onClick={funcExpHide} />

      <select value={category} onChange={e => selectOption(e)}>
        {categories.map(e => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={e => addItemName(e)}
        autoFocus
      />
      <input
        type="number"
        placeholder="Item Price"
        value={price}
        onChange={e => addPrice(e)}
      />
      <DatePicker selected={date} onChange={addDate} placeholderText="date" />
      <input type="file" onChange={e => uploadImage(e)} />
      <input type="submit" value="Update" />
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  _id: state.auth.user._id,
  categories: state.budget.categories
});

export default connect(
  mapStateToProps,
  { addNewExpenses }
)(ExpForm);
