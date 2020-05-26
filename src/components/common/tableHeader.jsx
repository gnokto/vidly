import React, { Component } from "react";

//columns: array
//sortColumn: obj
//onSort: function

class TableHeader extends Component {
  raiseSort = (newPath) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === newPath) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = newPath;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
