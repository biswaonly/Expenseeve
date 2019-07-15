import React from "react";
import TableCards from "./TableCards";
import { Pagination } from "antd";
import "../../../node_modules/antd/dist/antd.css";
import { connect } from "react-redux";

interface Props {
  data: any[];
}

const Table: React.SFC<Props> = ({ data }) => {
  return (
    <div>
      {data.map(item => (
        <TableCards key={item._id} item={item} uid={item._id} />
      ))}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.expenses.data ? state.expenses.data : []
});

export default connect(mapStateToProps)(Table);
