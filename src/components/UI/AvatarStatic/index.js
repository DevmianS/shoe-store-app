import {rwdValue} from '@/utils/theme';
import {Avatar, Box, styled} from '@mui/material';

const AvatarStatic = ({variant = 'medium', sx}) => {
  /* placeholders to be changed to redux states */
  const srcPlaceholder = '/';
  const altPlaceholder = 'Jane Doe';

  const BoxStyled = styled(Box)(() => ({
    width:
      variant === 'small'
        ? rwdValue(61, 64)
        : variant === 'medium'
        ? rwdValue(61, 120)
        : variant === 'large'
        ? rwdValue(100, 150)
        : 'unset',
    height:
      variant === 'small'
        ? rwdValue(61, 64)
        : variant === 'medium'
        ? rwdValue(61, 120)
        : variant === 'large'
        ? rwdValue(100, 150)
        : 'unset',
    maxWidth:
      variant === 'small'
        ? 64
        : variant === 'medium'
        ? 120
        : variant === 'large'
        ? 150
        : 'unset',
    maxHeight:
      variant === 'small'
        ? 64
        : variant === 'medium'
        ? 120
        : variant === 'large'
        ? 150
        : 'unset',
    borderRadius: '50%',
  }));

  const initials = altPlaceholder.substring(0, 2).toUpperCase();

  return (
    <>
      <BoxStyled sx={{...sx}}>
        <Avatar
          src={srcPlaceholder}
          alt={altPlaceholder}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {initials}
        </Avatar>
      </BoxStyled>
    </>
  );
};

export default AvatarStatic;
