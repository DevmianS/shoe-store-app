import {Typography, styled, Box, Stack} from '@mui/material';
import AvatarStatic from '@/components/UI/AvatarStatic';

const AvatarStaticLayout = () => {
  const AvatarWrapper = styled(Stack)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '40px',
    alignItems: 'center',
    marginBottom: '7px',
    paddingBottom: '32px',
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  }));
  return (
    <AvatarWrapper>
      <AvatarStatic variant="small" />
      <Box sx={{ml: 2}}>
        <Typography color="text.tetriary" fontSize={12}>
          Welcome
        </Typography>
        <Typography fontWeight={500}>{'Jane Doe'}</Typography>
      </Box>
    </AvatarWrapper>
  );
};

export default AvatarStaticLayout;
