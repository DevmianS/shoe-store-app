import {rwdValue} from '@/utils/theme';
import {Avatar, Box, Link} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import useUser from '@/hooks/useUser';
import {useRouter} from 'next/router';

const AvatarStatic = ({variant = 'medium', sx}) => {
  const styles = {
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
    },
  };

  const size =
    variant === 'small'
      ? rwdValue(61, 64)
      : variant === 'medium'
      ? rwdValue(61, 120)
      : variant === 'large'
      ? rwdValue(100, 150)
      : 'unset';
  const maxSize =
    variant === 'small'
      ? 64
      : variant === 'medium'
      ? 120
      : variant === 'large'
      ? 150
      : 'unset';

  const avatarVariant = {
    width: size,
    height: size,
    maxWidth: maxSize,
    maxHeight: maxSize,
    borderRadius: '50%',
  };

  const {initials} = useUser();
  const router = useRouter();

  if (variant === 'small') {
    return (
      <Box
        onClick={() => router.push('/profile')}
        sx={{...avatarVariant, ...sx}}
      >
        <Avatar src={'/'} sx={styles.avatarLink}>
          {initials}
        </Avatar>
      </Box>
    );
  } else {
    return (
      <Box sx={{...avatarVariant, ...sx}}>
        <Avatar src={'/'} sx={styles.avatar}>
          {initials}
        </Avatar>
      </Box>
    );
  }
};

export default AvatarStatic;
