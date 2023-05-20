import Head from 'next/head';
import {rwdValue} from '@/utils/theme';

import {
  Typography,
  Box,
  Stack,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormGroup,
} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import {useState} from 'react';
import FileInput from '@/components/UI/FileInput';
import Button from '@/components/UI/Button';

const AddProduct = ({userName}) => {
  const [select, setSelect] = useState({gender: 'male', brand: 'nike'});
  const [size, setSize] = useState({
    36: false,
    37: false,
    38: false,
    39: false,
    40: false,
  });
  // EVENTS
  const genderChangeHandler = e => {
    setSelect({...select, gender: e.target.value});
  };
  const brandChangeHandler = e => {
    setSelect({...select, brand: e.target.value});
  };
  const checkBoxChangeHandler = e => {
    if (e.target.checked) {
      setSize(prev => ({...prev, [e.target.name]: true}));
    } else {
      setSize(prev => ({...prev, [e.target.name]: false}));
    }
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: !isDesktop ? '25px 0' : '40px 0',
    },
    header: {
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'column',
      rowGap: '10px',
      alignItems: isDesktop ? 'start' : 'center',
      justifyContent: 'space-between',
      marginBottom: rwdValue(20, 35),
      marginTop: 10,
    },
    btn: {
      maxWidth: rwdValue(120, 150),
    },
    formItem: {marginBottom: '25px'},
    formGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: isDesktop ? 'space-between' : 'start',
      gap: '10px',
      marginBottom: '20px',
      '& .MuiFormLabel-root': {
        cursor: 'pointer',
        border: `1px solid #C4C4C4`,
        borderRadius: '5.58px',
        width: isDesktop ? '75px' : '52px',
        height: isDesktop ? '48px' : '34px',
        fontSize: isDesktop ? '15px' : '10px',
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
    content: {
      '& .MuiInputBase-root': {
        height: isDesktop ? '48px' : '33px',
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& label': {
        fontSize: isDesktop ? '15px' : '12px',
      },
      flex: '1 1 auto',
      padding: `0 ${rwdValue(20, 60)}`,
    },
    contentRow: {
      justifyContent: 'space-between',
      flexDirection: !isDesktop ? 'column' : 'row',
    },
    text: {
      color: theme.palette.text.secondary,
      marginBottom: rwdValue(25, 40),
      fontSize: rwdValue(12, 15),
      maxWidth: '900px',
    },
    form: {
      maxWidth: !isDesktop ? '100%' : '440px',
      flex: !isDesktop ? '1 1 auto' : '0 0 440px',
      marginRight: !isDesktop ? 0 : rwdValue(30, 120),
      '& .MuiInputBase-input': {
        fontSize: isDesktop ? '15px' : '10px',
      },
    },
    selects: {
      display: 'flex',
      gap: '20px',
      flexDirection: 'row',
    },
    textarea: {
      '& .MuiInputBase-root': {
        minHeight: isDesktop ? '270px' : 0,
        height: {xs: '34px'},
      },
      '& .MuiInputBase-input': {
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& label': {
        fontSize: isDesktop ? '15px' : '12px',
      },
    },
    filesRow: {
      display: 'flex',
      gap: !isDesktop ? '20px' : '52px',
      flexWrap: 'wrap',
    },
    filesWrap: {
      flex: '1 1 auto',
      width: '100%',
      paddingLeft: rwdValue(0, 110),
      paddingRight: rwdValue(0, 110),
    },
    label: {
      fontSize: isDesktop ? '15px' : '12px',
      flex: '0 0 100%',
    },
  };
  return (
    <>
      <Head>
        <title>Wellrun | Add Product</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.container}>
          <SideBar />
          <Box sx={styles.content}>
            <Box sx={styles.header}>
              <Typography variant="h1" component="h1">
                Add product
              </Typography>
              <Button
                sx={styles.btn}
                size={isDesktop ? 'medium' : 'small'}
                variant="contained"
              >
                Save
              </Button>
            </Box>
            <Typography variant="body5" component="p" sx={styles.text}>
              The account page allows you to manage your products easily. You
              can add new products to your inventory, update existing ones, and
              keep track of all your product listings in one convenient
              location. With simple and intuitive tools, you can quickly create
              new product pages, upload images, add descriptions, and set
              prices. Stay organized and streamline your product management with
              the account page.
            </Typography>
            <Stack sx={styles.contentRow}>
              <Box sx={styles.form}>
                <Box sx={styles.formItem}>
                  <TextField
                    fullWidth
                    size={isDesktop ? 'medium' : 'small'}
                    placeholder="Nike Air Max 90"
                    label="Product name"
                    type="text"
                  />
                </Box>
                <Box sx={styles.formItem}>
                  <TextField
                    fullWidth
                    size={isDesktop ? 'medium' : 'small'}
                    placeholder="Sport"
                    label="Category"
                    type="text"
                  />
                </Box>
                <Box sx={styles.formItem}>
                  <Box sx={styles.selects}>
                    <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        size={isDesktop ? 'medium' : 'small'}
                        labelId="gender"
                        variant="outlined"
                        value={select.gender}
                        onChange={genderChangeHandler}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="indeterminate">Indeterminate</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="brand">Brand</InputLabel>
                      <Select
                        size={isDesktop ? 'medium' : 'small'}
                        labelId="brand"
                        variant="outlined"
                        value={select.brand}
                        onChange={brandChangeHandler}
                      >
                        <MenuItem value="adidas">Adidas</MenuItem>
                        <MenuItem value="asics">Asics</MenuItem>
                        <MenuItem value="newBalance">New Balance</MenuItem>
                        <MenuItem value="nike">Nike</MenuItem>
                        <MenuItem value="puma">Puma</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={styles.formItem}>
                  <TextField
                    fullWidth
                    size={isDesktop ? 'medium' : 'small'}
                    placeholder="Do not exceed 300 characters."
                    label="Description"
                    type="text"
                    multiline
                    rows={isDesktop ? 11 : 1}
                    sx={styles.textarea}
                  />
                </Box>
                <FormGroup sx={styles.formGroup}>
                  <Typography sx={styles.label}>Add size</Typography>
                  {[...Object.keys(size)].map(n => {
                    const checkboxStyle = {
                      background: size[n]
                        ? theme.palette.primary.main
                        : 'white',
                      color: size[n] ? 'white' : theme.palette.text.secondary,
                      '&:hover': {
                        borderColor: 'black',
                        color: 'black',
                      },
                    };
                    return (
                      <Box key={n}>
                        <Checkbox
                          name={n}
                          checked={size[n]}
                          onChange={checkBoxChangeHandler}
                          id={'size' + n}
                        />
                        <InputLabel sx={checkboxStyle} htmlFor={'size' + n}>
                          EU-{n}
                        </InputLabel>
                      </Box>
                    );
                  })}
                </FormGroup>
              </Box>
              <Box sx={styles.filesWrap}>
                <InputLabel>Product images</InputLabel>
                <Box sx={styles.filesRow}>
                  <FileInput />
                  <FileInput />
                  <FileInput />
                  <FileInput />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default AddProduct;
