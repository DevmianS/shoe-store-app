import {rwdValue} from '@/utils/theme';
import {Avatar, Box} from '@mui/material';
import useOwnStyles from '@/utils/styles';

const AvatarStatic = ({username, variant = 'medium', sx}) => {
  const {UI: styles} = useOwnStyles();
  /* placeholders to be changed to redux states */
  const srcPlaceholder = '/';
  const altPlaceholder = username || 'Jane Meldrum';

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

  const nameSplit = altPlaceholder.split(' ');
  const initials = `${nameSplit[0][0]}${nameSplit[1][0]}`;

  return (
    <Box component="a" href="/profile" sx={{...avatarVariant, ...sx}}>
      <Avatar src={srcPlaceholder} alt={altPlaceholder} sx={styles.avatar}>
        {initials}
      </Avatar>
    </Box>
  );
};

export default AvatarStatic;
