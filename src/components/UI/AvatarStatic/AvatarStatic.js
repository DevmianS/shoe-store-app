import Image from 'next/image';
import {useRouter} from 'next/router';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import useUser from '@/hooks/useUser';
import {rwdValue, theme} from '@/utils/theme';

const AvatarStatic = ({variant = 'medium', sx}) => {
  const {avatar, status, initials} = useUser();
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
  return (
    <Avatar
      onClick={() => {
        router.push('/profile');
      }}
      sx={{
        ...variantsSize,
        ...sx,
        bgcolor: status !== 'authenticated' ? 'transparent' : 'auto',
        '& img': {objectFit: 'cover'},
        cursor: 'pointer',
      }}
    >
      {avatar ? (
        <Image src={avatar} fill alt={initials + ' user avatar'} />
      ) : status === 'authenticated' ? (
        initials
      ) : (
        <Box
          className={'icon-profile'}
          sx={{fontSize: 65, color: theme.palette.text.light}}
        ></Box>
      )}
    </Avatar>
  );
};
export default AvatarStatic;
