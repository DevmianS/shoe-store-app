import {Button as MUIButton} from '@mui/material';

//size: "small" | "medium" | "large"

function Button({
  size = 'medium',
  outlined,
  onClick,
  disabled,
  children,
  sx,
  type,
}) {
  return (
    <MUIButton
      variant={outlined ? 'outlined' : 'contained'}
      color="primary"
      disableElevation
      size={size}
      fullWidth
      onClick={onClick}
      disabled={disabled}
      sx={{...sx}}
      type={type === 'submit' && 'submit'}
    >
      {children}
    </MUIButton>
  );
}
export default Button;
