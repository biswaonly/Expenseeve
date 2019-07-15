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
  imageInputFile: any;
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
    image: "",
    imageInputFile: ""
  });

  const { category, itemName, price, date, image } = state;

  // Form Submit
  const createNewExp = (e: React.FormEvent) => {
    e.preventDefault();
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
  var u;

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log((e.target as any).files[0]);
    setState({ ...state, imageInputFile: (e.target as any).files[0] });
  };

  const abc = async () => {
    const fd = new FormData();
    // fd.append("image", state.imageInputFile, state.imageInputFile.name);
    // console.log(fd);

    // const config = {
    //   headers: {
    //     Authorization: "Client-ID d14fc9df79960b7"
    //   }
    // };

    // try {
    //   const res = await axios.post(
    //     "https://api.imgur.com/3/image/",
    //     fd,
    //     config
    //   );
    //   console.log(res);
    // } catch (err) {
    //   console.error(err);
    // }

    const r = new XMLHttpRequest();
    fd.append("image", state.imageInputFile);

    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID d14fc9df79960b7`);
    r.onreadystatechange = async function() {
      if (r.status === 200 && r.readyState === 4) {
        let res = await JSON.parse(r.responseText);
        setState({ ...state, image: `https://i.imgur.com/${res.data.id}.png` });
      }
    };
    r.send(fd);
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
      <input type="button" onClick={abc} value="Image Upload" />
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
