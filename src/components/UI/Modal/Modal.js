import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

const modalStyles = {
  title: {marginBottom: rwdValue(20, 50)},
  text: {
    marginBottom: rwdValue(20, 50),
    paddingBottom: rwdValue(20, 50),
    borderBottom: '1px solid #EBEBEB',
  },
};

export default function Modal({
  state,
  setState,
  title,
  text,
  submitAction,
  children,
}) {
  return (
    <Dialog
      open={state}
      onClose={() => setState(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle component="h3" variant="h1" sx={modalStyles.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="body1" component="p" sx={modalStyles.text}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setState(false)} outlined>
          Cancel
        </Button>
        <Button onClick={submitAction} autoFocus>
          Delete
        </Button>
      </DialogActions>
      {children}
    </Dialog>
  );
}
