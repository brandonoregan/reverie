import React from "react";
import { Link } from "react-router-dom";

function BackButton({ toLink, children, className, style }) {
  return (
    <Link to={toLink} className={className} style={style}>
      {children}
    </Link>
  );
}

export default BackButton;
