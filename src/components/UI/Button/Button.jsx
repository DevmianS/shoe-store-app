import {Button as MUIButton} from '@mui/material';

//size: "small" | "medium" | "large"

function Button({size = 'medium', outlined, onClick, children}) {
  return (
    <MUIButton
      variant={outlined ? 'outlined' : 'contained'}
      color="primary"
      disableElevation
      size={size}
      fullWidth
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
}
export default Button;
