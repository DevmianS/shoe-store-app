import {Typography, styled, Box, Stack} from '@mui/material';
import AvatarStatic from '@/components/UI/AvatarStatic';

import {useSession} from 'next-auth/react';

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

  const {data, status} = useSession();
  const name = data?.user?.user?.username;

  return (
    <AvatarWrapper>
      <AvatarStatic variant="small" username={name} />
      <Box sx={{ml: 2}}>
        <Typography color="text.tetriary" fontSize={12}>
          Welcome
        </Typography>
        <Typography fontWeight={500}>{name}</Typography>
      </Box>
    </AvatarWrapper>
  );
};

export default AvatarStaticLayout;
