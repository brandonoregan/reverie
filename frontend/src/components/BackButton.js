import React from "react";
import { Link } from "react-router-dom";

function BackButton({ toLink, children, className }) {
  return (
    <Link to={toLink} className={className}>
      {children}
    </Link>
  );
}

export default BackButton;
