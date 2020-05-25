import React from "react";

const Like = (props) => {
  let cssClass = "fa fa-heart-o";
  if (props.liked === true) {
    cssClass = "fa fa-heart";
  }
  return (
    <i
      className={cssClass}
      style={{ cursor: "pointer" }}
      onClick={props.onToggle}
    ></i>
  );
};

export default Like;
