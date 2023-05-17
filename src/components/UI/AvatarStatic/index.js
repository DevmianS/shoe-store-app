import {rwdValue} from '@/utils/theme';
import {Avatar, Box} from '@mui/material';
import useOwnStyles from '@/utils/styles';

const AvatarStatic = ({username, variant = 'medium', sx}) => {
  const {UI: styles} = useOwnStyles();
  /* placeholders to be changed to redux states */
  const srcPlaceholder = '/';
  let altPlaceholder = username || '';
  if (altPlaceholder) {
    altPlaceholder = altPlaceholder.slice(0, 2).toUpperCase();
  }

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

  return (
    <Box component="a" href="/profile" sx={{...avatarVariant, ...sx}}>
      <Avatar alt={altPlaceholder} sx={styles.avatar}>
        {altPlaceholder}
      </Avatar>
    </Box>
  );
};

export default AvatarStatic;
