import React from 'react'
import { Modal, Button } from "react-bootstrap"


const Alert = ({ handleShow, handleClose, show, variant, title, message }) => {

  const ModalIcon = () => {
    if (variant === 'success') {
      return (
        <i style={{
          color: "#4aa832"
        }}
          className="fas fa-3x fa-check">
        </i>
      )
    }
    else if(variant === 'failure'){
      return (
        <i style={{
          color: "#cc1414"
        }}
          className="fas fa-times">
        </i>
      )
    }
  }


  return (
    <Modal
      centered
      backdrop="static"
      variant="primary" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className="text-center">
        <h3>{message}</h3>
        <div>
          <ModalIcon />
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Alert
