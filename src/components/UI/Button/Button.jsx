import {Button as MUIButton} from '@mui/material';

//size: "small" | "medium" | "large"

function Button({size = 'medium', outlined, onClick, disabled, children}) {
  return (
    <MUIButton
      variant={outlined ? 'outlined' : 'contained'}
      color="primary"
      disableElevation
      size={size}
      fullWidth
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  );
}
export default Button;
