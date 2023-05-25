import {useRouter} from 'next/router';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import useUser from '@/hooks/useUser';
import {rwdValue} from '@/utils/theme';

const avatarStaticStyles = {
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarLink: {
    width: '100%',
    height: '100%',
    transition: '.3s',
    '&:hover': {
      boxShadow: `0 0 3px 1px grey`,
      transform: 'scale(1.03)',
      filter: 'brightness(1.1)',
    },
    cursor: 'pointer',
  },
};

const AvatarStatic = ({variant = 'medium', sx}) => {
  const {initials} = useUser();
  const router = useRouter();

  const sizes = {
    small: {range: rwdValue(61, 64), max: 64},
    medium: {range: rwdValue(61, 120), max: 120},
    large: {range: rwdValue(100, 150), max: 150},
  };

  const variantsSize = {
    width: sizes[variant].range,
    height: sizes[variant].range,
    maxWidth: sizes[variant].max,
    maxHeight: sizes[variant].max,
    borderRadius: '50%',
  };

  const avatarClickHandler = () => {
    if (variant !== 'small') {
      return;
    }
    router.push('/profile');
  };

  return (
    <Box onClick={avatarClickHandler} sx={{...variantsSize, ...sx}}>
      <Avatar src={'/'} sx={avatarStaticStyles.avatarLink}>
        {initials}
      </Avatar>
    </Box>
  );
};

export default AvatarStatic;
