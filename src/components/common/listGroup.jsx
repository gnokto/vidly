import React from "react";

const ListGroup = ({
  items,
  textProperty,
  keyProperty,
  onItemSelect,
  selectedItem,
}) => {
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
