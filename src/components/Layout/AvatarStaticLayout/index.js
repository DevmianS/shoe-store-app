import {Typography, Box, Stack, useTheme, useMediaQuery} from '@mui/material';
import AvatarStatic from '@/components/UI/AvatarStatic';
import {useSession} from 'next-auth/react';
import useOwnStyles from '@/utils/styles';
import {rwdValue} from '@/utils/theme';
import useUser from '@/hooks/useUser';
import styled from '@emotion/styled';

const AvatarStaticLayout = ({variant}) => {
  const {avatarLayout: styles, updateProfile} = useOwnStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {name} = useUser();
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
        <Typography fontWeight={500}>{name}</Typography>
      </Box>
    </AvatarWrapper>
  );
};

export default AvatarStaticLayout;
