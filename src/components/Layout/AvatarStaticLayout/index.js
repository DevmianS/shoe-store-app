import {Typography, Box, Stack, useTheme, useMediaQuery} from '@mui/material';
import AvatarStatic from '@/components/UI/AvatarStatic';
import useOwnStyles from '@/utils/styles';
import {rwdValue} from '@/utils/theme';
import useUser from '@/hooks/useUser';
import {memo} from 'react';

const AvatarStaticLayout = ({variant}) => {
  const {avatarLayout: styles, updateProfile} = useOwnStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {name} = useUser();

  if (variant === 'card') {
    return (
      <Stack sx={styles.wrapper}>
        <AvatarStatic
          variant="small"
          userName={name}
          sx={{textDecoration: 'none'}}
        />
        <Box sx={{ml: 2}}>
          <Typography fontSize={12}>Welcome</Typography>
          <Typography sx={styles.name}>{name}</Typography>
        </Box>
      </Stack>
    );
  } else if (variant === 'avatar') {
    return <AvatarStatic variant="large" sx={updateProfile.avatar} />;
  } else {
    return (
      <Stack
        direction="row"
        alignItems="end"
        sx={{
          marginLeft: rwdValue(20, 50),
          marginBottom: rwdValue(20, 30),
          marginTop: isTablet ? '-15px' : '-30px',
        }}
      >
        <AvatarStatic
          variant="medium"
          userName={name}
          sx={{
            marginRight: rwdValue(5, 15),
            border: '4px solid white',
            zIndex: 2,
          }}
        />
        <Box>
          <Typography
            variant="body2"
            component="h3"
            fontSize={rwdValue(14, 20)}
          >
            {name}
          </Typography>
          <Typography
            color="text.tetriary"
            fontSize={rwdValue(12, 15)}
            mb={isTablet ? 0 : '12px'}
          >
            1 374 bonus points
          </Typography>
        </Box>
      </Stack>
    );
  }
};

export default memo(AvatarStaticLayout);
