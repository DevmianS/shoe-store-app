import {rwdValue} from '@/utils/theme';
import {Avatar, Box, Link} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import useUser from '@/hooks/useUser';

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

  const {initials,name} = useUser()

  return (
    <Box component="a" href="/profile" sx={{...avatarVariant, ...sx}}>
      <Avatar alt={name} sx={styles.avatar}>
        {initials}
      </Avatar>
    </Box>
  );

};

export default AvatarStatic;
