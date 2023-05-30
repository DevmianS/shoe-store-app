import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {rwdValue, theme} from '@/utils/theme';
import useUser from '@/hooks/useUser';
import AvatarStatic from '@/components/UI/AvatarStatic';

const AvatarStaticLayoutStyles = {
  wrapper: {
    display: 'flex',
    minHeight: '105px',
    flexDirection: 'row',
    paddingLeft: '40px',
    alignItems: 'center',
    marginBottom: '7px',
    paddingBottom: '32px',
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  },
  avatar: {
    marginRight: rwdValue(28, 75),
    flex: `0 0 ${rwdValue(100, 150)}`,
  },
  avatarName: {
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 500,
  },
  avatarGap: {ml: 2},
  avatarText: {fontSize: '12px'},
  email: {
    color: theme.palette.text.tetriary,
    fontSize: rwdValue(12, 15),
    marginBottom: {xs: 0, sm: '12px'},
  },
  largeName: {fontSize: rwdValue(14, 20)},
  small: {
    color: 'white!important',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      filter: 'brightness(1.1)',
    },
  },
  largeWrap: {
    marginLeft: rwdValue(20, 50),
    marginBottom: rwdValue(20, 30),
    alignItems: 'end',
    flexDirection: 'row',
    marginTop: {xs: '-15px', md: '-30px'},
  },
  largeAvatar: {
    marginRight: rwdValue(5, 15),
    border: '4px solid white',
    zIndex: 2,
  },
};

const AvatarStaticLayout = ({variant}) => {
  const {name, data, status} = useUser();

  return (
    <>
      {variant === 'card' ? (
        <Stack sx={AvatarStaticLayoutStyles.wrapper}>
          <AvatarStatic
            component="a"
            href="/profile"
            variant="small"
            userName={name}
            sx={AvatarStaticLayoutStyles.small}
          />
          <Box sx={AvatarStaticLayoutStyles.avatarGap}>
            <Typography sx={AvatarStaticLayoutStyles.avatarText}>
              Welcome
            </Typography>
            <Typography sx={AvatarStaticLayoutStyles.avatarName}>
              {status === 'authenticated' ? name : 'Guest'}
            </Typography>
          </Box>
        </Stack>
      ) : variant === 'avatar' ? (
        <AvatarStatic variant="large" sx={AvatarStaticLayoutStyles.avatar} />
      ) : (
        <Stack sx={AvatarStaticLayoutStyles.largeWrap}>
          <AvatarStatic
            variant="medium"
            userName={name}
            sx={AvatarStaticLayoutStyles.largeAvatar}
          />
          <Box>
            <Typography
              variant="body2"
              component="h3"
              sx={AvatarStaticLayoutStyles.largeName}
            >
              {name}
            </Typography>
            <Typography sx={AvatarStaticLayoutStyles.email}>
              {data?.user?.user?.email}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default AvatarStaticLayout;
