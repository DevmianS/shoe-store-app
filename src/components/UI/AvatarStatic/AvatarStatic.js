import Avatar from '@mui/material/Avatar';

import useUser from '@/hooks/useUser';
import {rwdValue} from '@/utils/theme';
import Image from 'next/image';

const AvatarStatic = ({variant = 'medium', sx}) => {
  const {avatar, initials} = useUser();

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
      sx={{
        ...variantsSize,
        ...sx,
      }}
    >
      {avatar ? (
        <Image src={avatar} fill alt={initials + ' user avatar'} />
      ) : (
        initials
      )}
    </Avatar>
  );
};
export default AvatarStatic;
