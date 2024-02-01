import { Alert, Button } from "react-bootstrap";
import React, { useState } from "react";

function Message({ variant, children, className }) {
  const [show, setShow] = useState(true);

  function handleClose() {
    setShow(false);
  }

  return (
    <>
      {show && (
        <Alert
          className={className}
          style={{
            backgroundColor: "#ece7db",
            position: "absolute",
            borderRadius: "0",
            border: 0,
            fontFamily: "Judson",
            fontSize: "1.2rem",
            color: "black",
            width: "100%",
            opacity: 0.8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Vertically align items in the middle
            padding: "0.75rem 1.25rem",
          }}
          variant={variant}
        >
          {children}
          <i
            style={{ cursor: "pointer" }}
            onClick={handleClose}
            className="fa-solid fa-x"
          ></i>
        </Alert>
      )}
    </>
  );
}

export default Message;
