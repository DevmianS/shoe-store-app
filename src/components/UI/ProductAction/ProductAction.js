import {useRouter} from 'next/router';
import React, {useState} from 'react';

import {toast} from 'sonner';

import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import useProductData from '@/hooks/useProductData';
import useUser from '@/hooks/useUser';

import {rwdValue, theme} from '@/utils/theme';
import {
  createProduct,
  uploadImages,
  validationCreateProduct,
} from '@/utils/utils';

import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import ImageUploader from '@/components/UI/ImageUploader';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const contentDescription = `Effortlessly manage your shop's product inventory with our intuitive
form for adding and editing products. Streamline your workflow and
stay organized as you easily input and update product details such
as name, description, price, and availability. With a user-friendly
interface and comprehensive fields, you can swiftly add new products
or make changes to existing ones. Enhance your online store's
efficiency and maintain accurate product information with our
convenient form, designed to simplify the process of managing your
shop's offerings. Start optimizing your product management today!`;

const selectsInit = {gender: 'Men', brand: 'Nike', color: 'Black', size: '36'};

const actionStyles = {
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

const ProductAction = ({isEditing, openState, setOpenState}) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const flexStyles = {
    headerRow: {
      alignItems: isDesktop ? 'center' : 'start',
      flexDirection: isDesktop ? 'row' : 'column',
    },
    formRow: {
      flexDirection: isDesktop ? 'row' : 'column',
    },
    rwdSize: isDesktop ? 'medium' : 'small',
  };
  const router = useRouter();

  const {brands, categories, genders, sizes, colors, isLoading, setCategories} =
    useProductData() || {};

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [arrImages, setArrImages] = useState([]);
  const [select, setSelect] = useState(selectsInit);

  const [loading, setLoading] = useState(false);
  const [openState, setOpenState] = useState(false);

  // EVENTS
  const selectChangeHandler = property => e => {
    setSelect({...select, [property]: e.target.value});
  };

  const checkBoxChangeHandlerCategory = event => {
    setCategories(
      categories.map(obj => {
        if (obj.name == event.target.htmlFor) {
          return {
            ...obj,
            needed: !obj.needed,
          };
        }
        return obj;
      }),
    );
  };

  const {jwt, id} = useUser();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const errorInParameters = await validationCreateProduct({
        genders,
        price,
        categories,
        sizes,
        colors,
        name,
        arrImages,
        description,
        id,
        jwt,
      });

      if (errorInParameters) {
        toast.message('Please fill in the gaps again correctly.');
      } else {
        let arrImgId = await uploadImages(arrImages, jwt);
        const res = await createProduct({
          genders,
          select,
          brands,
          price,
          categories,
          sizes,
          colors,
          name,
          arrImgId,
          description,
          id,
          jwt,
        });

        if (res?.status == '200') {
          resetForm();
          router.push('/my-products');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelect(selectsInit);
    setName('');
    setDescription('');
    setPrice(0);
    setArrImages([]);
    setCategories(
      categories.map(obj => {
        return {
          ...obj,
          needed: false,
        };
      }),
    );
  };
  const handleClose = () => {
    setOpenState(false);
    resetForm();
  };

  return (
    <Dialog
      open={openState}
      onClose={handleClose}
      fullWidth
      maxWidth="xl"
      sx={actionStyles.dialog}
      TransitionComponent={Transition}
    >
      {loading && <Loading />}
      <Box sx={actionStyles.content}>
        <Box sx={{...actionStyles.headerRow, ...flexStyles.headerRow}}>
          <DialogTitle variant="h1" component="h1" sx={actionStyles.title}>
            {isEditing ? 'Edit' : 'Add'} product
          </DialogTitle>
          <DialogActions sx={actionStyles.btns}>
            <Button
              size={flexStyles.rwdSize}
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size={flexStyles.rwdSize}
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
        <DialogContentText
          variant="body5"
          component="p"
          sx={actionStyles.description}
        >
          {contentDescription}
        </DialogContentText>
        <form style={{...actionStyles.formRow, ...flexStyles.formRow}}>
          <DialogContent sx={actionStyles.form}>
            <Box sx={actionStyles.formItem}>
              <TextField
                fullWidth
                size={flexStyles.rwdSize}
                placeholder="Nike Air Max 90"
                label="Product name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Box>
            <Box sx={actionStyles.formItem}>
              <TextField
                fullWidth
                size={flexStyles.rwdSize}
                placeholder="Price"
                label="Price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Box>
            <Box sx={actionStyles.formItem}>
              <Box sx={actionStyles.selectsRow}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    variant="outlined"
                    value={select.gender}
                    onChange={selectChangeHandler('gender')}
                    defaultValue="Men"
                    size={flexStyles.rwdSize}
                  >
                    {!isLoading &&
                      genders.map(gender => {
                        return (
                          <MenuItem key={gender.id} value={gender.name}>
                            {gender.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="brand">Brand</InputLabel>
                  <Select
                    size={flexStyles.rwdSize}
                    labelId="brand"
                    variant="outlined"
                    value={select.brand}
                    onChange={selectChangeHandler('brand')}
                  >
                    {!isLoading &&
                      brands.map(brand => {
                        return (
                          <MenuItem key={brand.id} value={brand.name}>
                            {brand.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="color">Color</InputLabel>
                  <Select
                    labelId="color"
                    variant="outlined"
                    aria-label="color"
                    value={select.color}
                    onChange={selectChangeHandler('color')}
                    defaultValue="Black"
                    size={flexStyles.rwdSize}
                  >
                    {!isLoading &&
                      colors.map(color => {
                        console.log(colors.name);
                        return (
                          <MenuItem key={color.id} value={color.name}>
                            {color.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="size">Size</InputLabel>
                  <Select
                    labelId="size"
                    variant="outlined"
                    aria-label="size"
                    value={select.size}
                    onChange={selectChangeHandler('size')}
                    size={flexStyles.rwdSize}
                    defaultValue="36"
                  >
                    {!isLoading &&
                      sizes.map(size => {
                        return (
                          <MenuItem key={size.id} value={size.value}>
                            {`EU-${size.value}`}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={actionStyles.formItem}>
              <InputLabel id="description">Description</InputLabel>
              <TextareaAutosize
                placeholder="Do not exceed 1000 characters."
                label="Description"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Box>
            <FormGroup sx={actionStyles.formGroup}>
              <Typography sx={actionStyles.label}>Add categories</Typography>
              {categories &&
                categories.map(category => {
                  const itemStyle = {
                    background: category.needed
                      ? theme.palette.primary.main
                      : 'white',
                    color: category.needed
                      ? 'white'
                      : theme.palette.text.secondary,
                    '&:hover': {
                      borderColor: 'black',
                      color: 'black',
                    },
                  };
                  return (
                    <Box
                      key={category.id}
                      onClick={checkBoxChangeHandlerCategory}
                    >
                      <Checkbox
                        name={category.name}
                        checked={category.needed}
                        onClick={checkBoxChangeHandlerCategory}
                        id={category.id}
                      />
                      <InputLabel sx={itemStyle} htmlFor={category.name}>
                        {category.name}
                      </InputLabel>
                    </Box>
                  );
                })}
            </FormGroup>
          </DialogContent>
          <DialogContent sx={actionStyles.filesWrap}>
            <InputLabel>Product images</InputLabel>
            <Box sx={actionStyles.filesRow}>
              <ImageUploader images={arrImages} setImages={setArrImages} />
            </Box>
          </DialogContent>
        </form>
      </Box>
    </Dialog>
  );
};

export default ProductAction;
