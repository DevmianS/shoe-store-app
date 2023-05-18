import {Typography, Box, Stack, useTheme, useMediaQuery} from '@mui/material';
import AvatarStatic from '@/components/UI/AvatarStatic';
import {useSession} from 'next-auth/react';
import useOwnStyles from '@/utils/styles';
import {rwdValue} from '@/utils/theme';

const AvatarStaticLayout = ({variant}) => {
  const {avatarLayout: styles, updateProfile} = useOwnStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {data: sessionData} = useSession();
  const userDetails = sessionData?.user?.user;

  let userName = null;
  if (userDetails?.firstName && userDetails?.lastName) {
    userName = `${userDetails.firstName} ${userDetails.lastName}`;
  } else {
    userName = userDetails?.username;
  }

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
        <Typography fontWeight={500}>{'Jane Meldrum'}</Typography>
      </Box>
    </AvatarWrapper>
  );
};

export default AvatarStaticLayout;
