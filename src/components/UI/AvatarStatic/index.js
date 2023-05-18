import {rwdValue} from '@/utils/theme';
import {Avatar, Box, Link} from '@mui/material';
import useOwnStyles from '@/utils/styles';

const AvatarStatic = ({userName, variant = 'medium', sx}) => {
  const {UI: styles} = useOwnStyles();

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

  let userInitials = null;
  if (userName?.includes(' ')) {
    const [firstName, lastName] = userName?.split(' ');
    userInitials = `${firstName[0]}${lastName[0]}`.toLocaleUpperCase();
  } else {
    userInitials = userName?.substring(0, 2).toLocaleUpperCase();
  }

  if (variant === 'small') {
    return (
      <Link component="a" href="/profile" sx={{...avatarVariant, ...sx}}>
        <Avatar src={'/'} sx={styles.avatarLink}>
          {userInitials}
        </Avatar>
      </Link>
    );
  } else {
    return (
      <Box sx={{...avatarVariant, ...sx}}>
        <Avatar src={'/'} sx={styles.avatar}>
          {userInitials}
        </Avatar>
      </Box>
    );
  }
};

export default AvatarStatic;
