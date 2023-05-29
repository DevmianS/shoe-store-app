import Avatar from '@mui/material/Avatar';
import {Box} from '@mui/material';
import useUser from '@/hooks/useUser';
import {rwdValue, theme} from '@/utils/theme';
import Image from 'next/image';

const AvatarStatic = ({variant = 'medium', sx}) => {
  const {avatar, status, initials} = useUser();

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
      component={variant === 'small' ? 'a' : 'span'}
      href={variant === 'small' ? '/profile' : null}
      sx={{
        ...variantsSize,
        ...sx,
        bgcolor: status !== 'authenticated' ? 'transparent' : 'auto',
        '& img': {objectFit: 'cover'},
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
