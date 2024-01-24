import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert className="my-2" variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;
