import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ show, variant, handleShow, handleClose, message }) {


  const Icon = () => {
    const color = variant === 'success' ? `#4aa832` : "red"
    const icon = variant === 'success' ? `fa-check` : "fa-exclamation-circle"
    return (
      <i style={{
        color: color
      }}
        className={`fas fa-3x ${icon}`} >
      </i >
    )
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span >{ }</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={`info`} id="alert-dialog-description">
          <h3>{message}</h3>
          <br />
          <div className='row'>
            <div className='col d-flex justify-content-center'>
              <Icon />
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
