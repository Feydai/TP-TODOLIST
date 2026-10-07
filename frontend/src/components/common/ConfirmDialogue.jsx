import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import AppButton from './AppButton.jsx';

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = 'CONFIRMER',
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <AppButton text="ANNULER" variant="text" onClick={onCancel} />

        <AppButton text={confirmText} color="error" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
