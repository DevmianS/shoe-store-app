import {Button} from '@mui/material';

function QuantityButton({onClick, children}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '100%',
        backgroundColor: '#FFD7D6',
        width: 32,
        height: 32,
      }}
    >
      {children}
    </Button>
  );
}

export default QuantityButton;
