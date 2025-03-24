import React from "react";
import { Modal, Button } from "react-bootstrap";

const Confirm = (props) => {
  return (
    <Modal show={props.show} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
