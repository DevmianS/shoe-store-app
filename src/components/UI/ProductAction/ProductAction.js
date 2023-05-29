import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

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

import {theme} from '@/utils/theme';
import actionStyles from './actionStyles';
import {
  createProduct,
  executeError,
  executeInfo,
  uploadImages,
  validationProductFields,
} from '@/utils/utils';
import {
  contentDescription,
  fetchById,
  filesToStateHandler,
  selectsInit,
  updateProductSubmit,
  getEditData,
} from '@/utils/editProduct';

import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import ImageUploader from '@/components/UI/ImageUploader';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAction = ({isEditing, openState, setOpenState, productId}) => {
  const router = useRouter();
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
  const {brands, categories, genders, sizes, colors, isLoading, setCategories} =
    useProductData() || {};
  const {jwt, id} = useUser();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [arrImages, setArrImages] = useState([]);
  const [select, setSelect] = useState(selectsInit);
  const [loading, setLoading] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const selectsdata = [
    {
      id: 'gender',
      defaultValue: 'Men',
      object: genders,
    },
    {
      id: 'brand',
      defaultValue: 'Nike',
      object: brands,
    },
    {
      id: 'color',
      defaultValue: 'Black',
      object: colors,
    },
    {
      id: 'size',
      defaultValue: '36',
      object: sizes,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      if (!productId) {
        console.warn('NO PRODUCT ID OR IS ADD PRODUCT');
        return;
      }

      const result = await fetchById(productId);
      const fullData = getEditData(result);
      const imagesData = result?.data?.attributes?.images?.data;

      if (imagesData) {
        const imageIds = imagesData.map(img => img?.id);
        const imageUrls = imagesData.map(img => img?.attributes?.url);
        await filesToStateHandler(imageIds, imageUrls, setArrImages);
      }

      setName(fullData.name);
      setDescription(fullData.description);
      setPrice(fullData.price);
      setSelect({
        gender: fullData.gender,
        brand: fullData.brand,
        color: fullData.color,
        size: fullData.size,
      });
      setCategories(
        categories.map(cat => ({
          ...cat,
          needed: fullData.categories.includes(cat.name),
        })),
      );
      setIsTouch(false);
    }
    fetchData();
  }, [productId, openState]);

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
  const validateParameters = async () => {
    return await validationProductFields({
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
  };
  const handleSubmit = async (uploadFn, submitFn) => {
    setLoading(true);

    try {
      const errorInParameters = await validateParameters();

      if (errorInParameters) {
        executeInfo('Please fill in the gaps again correctly.');
      } else {
        let arrImgId = await uploadFn(arrImages, jwt);
        const res = await submitFn({
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
          productId,
        });

        res?.status == '200' && successReset();
      }
    } catch (error) {
      console.error(error);
      executeError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const addProductHandleSubmit = async () => {
    await handleSubmit(
      uploadImages,
      createProduct,
      'Please fill in the gaps again correctly.',
    );
  };
  const editProductHandleSubmit = async () => {
    await handleSubmit(
      uploadImages,
      updateProductSubmit,
      'Please fill in the gaps again correctly.',
    );
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

  const successReset = () => {
    resetForm();
    setOpenState(false);
    setTimeout(() => router.reload(), 3000);
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
              disabled={!isTouch}
              onClick={
                isEditing ? editProductHandleSubmit : addProductHandleSubmit
              }
            >
              {isEditing ? 'Update' : 'Save'}
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
        <form
          style={{...actionStyles.formRow, ...flexStyles.formRow}}
          onInput={() => setIsTouch(true)}
        >
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
                {selectsdata.map(item => {
                  return (
                    <FormControl fullWidth>
                      <InputLabel id={item.id}>
                        {item.id.toUpperCase()}
                      </InputLabel>
                      <Select
                        labelId={item.id}
                        variant="outlined"
                        value={select[item.id]}
                        onChange={selectChangeHandler(item.id)}
                        defaultValue={item.defaultValue}
                        size={flexStyles.rwdSize}
                      >
                        {!isLoading &&
                          item.object.map(opt => {
                            const name =
                              item.id == 'size' ? opt.value : opt.name;
                            return (
                              <MenuItem key={opt.id} value={name}>
                                {name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  );
                })}
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
