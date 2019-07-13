import React from "react";
import "./common.css";

interface Props {}

const Header: React.SFC<Props> = () => {
  return (
    <div className="header">
      <h1>Expenseeve</h1>
    </div>
  );
};

export default Header;
