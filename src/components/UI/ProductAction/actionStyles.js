import {rwdValue, theme} from '@/utils/theme';

export default {
  dialog: {
    '& .MuiDialog-paper': {
      margin: {xs: '10px', md: '32px'},
      width: {xs: 'calc(100% - 20px)', md: 'calc(100% - 64px)'},
      maxHeight: {xs: 'calc(100% - 20px)', md: 'calc(100% - 64px)'},
    },
  },
  openButton: {
    maxWidth: '152px',
  },
  description: {
    color: 'text.secondary',
    mb: rwdValue(25, 40),
    fontSize: rwdValue(12, 15),
    lineHeight: 1.25,
  },
  title: {padding: 0},
  headerRow: {
    display: 'flex',
    rowGap: '10px',
    justifyContent: 'space-between',
    marginBottom: rwdValue(20, 35),
    marginTop: rwdValue(30, 60),
    '& button': {maxWidth: '152px'},
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: {xs: '25px 0', md: '40px 0'},
  },
  content: {
    '& .MuiInputBase-root': {
      height: {xs: '33px', md: '48px'},
      fontSize: {xs: '10px', md: '15px'},
    },
    '& label': {
      fontSize: {xs: '12px', md: '15px'},
    },
    flex: '1 1 auto',
    padding: `0 ${rwdValue(10, 60)}`,
  },
  formItem: {
    marginBottom: {xs: '15px', md: '25px'},
    '& textarea': {
      height: {md: '270px!important', xs: '34px!important'},
      width: '100%',
      color: '#5C5C5C',
      padding: '10px',
      borderRadius: '8px',
      resize: 'none',
      borderColor: 'rgba(0, 0, 0, 0.23)',
      fontSize: rwdValue(10, 15),
      fontFamily: 'inherit',
      '&::placeholder': {opacity: 0.3},
      '&:focus': {
        '&::placeholder': {opacity: 0},
        outline: 'none',
        borderColor: theme.palette.primary.main,
      },
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '10px',
    marginBottom: '20px',
    '& .MuiFormLabel-root': {
      cursor: 'pointer',
      border: `1px solid #C4C4C4`,
      borderRadius: '5.58px',
      width: {md: '75px', xs: '52px'},
      height: {md: '48px', xs: '34px'},
      fontSize: {md: '15px', xs: '10px'},
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    },
    '& .MuiCheckbox-root': {
      display: 'none',
    },
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  form: {
    maxWidth: {xs: '100%', md: '440px'},
    flexBasis: {xs: '440px', md: '100%'},
    overflow: 'visible',
    marginRight: {xs: 0, md: rwdValue(30, 120)},
    padding: rwdValue(0, 20),
    '& .MuiInputBase-input': {
      fontSize: {xs: '10px', md: '15px'},
    },
    '& form': {display: 'flex', flexWrap: 'wrap'},
  },
  selectsRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: {xs: '15px', md: '25px'},
    justifyContent: 'space-between',
    '& .MuiFormControl-root': {
      flex: '0 0 calc(50% - 10px)',
    },
  },
  label: {
    fontSize: rwdValue(12, 15),
    flex: '0 0 100%',
    fontWeight: 500,
  },
  filesRow: {
    display: 'flex',
    gap: {xs: '20px', md: '52px'},
    flexWrap: 'wrap',
  },
  filesWrap: {
    flex: '1 1 auto',
    width: '100%',
    padding: rwdValue(0, 20),
    marginBottom: '30px',
  },
  btns: {padding: 0},
  itemSize: {
    width: {md: '75px', xs: '52px'},
    height: {md: '48px', xs: '34px'},
    fontSize: {md: '15px', xs: '10px'},
    border: '1px solid #C4C4C4!important',
    borderRadius: '5.58px!important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
  },
};
