import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    keyProperty,
    onItemSelect,
    selectedItem,
  } = props;
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[keyProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  keyProperty: "_id",
};

export default ListGroup;
