import React from "react";

const Like = ({ liked, onToggle }) => {
  let cssClass = "fa fa-heart-o";
  if (liked === true) {
    cssClass = "fa fa-heart";
  }
  return (
    <i
      className={cssClass}
      style={{ cursor: "pointer" }}
      onClick={onToggle}
    ></i>
  );
};

export default Like;
