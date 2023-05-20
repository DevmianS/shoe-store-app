import axios from 'axios';
import {Skeleton} from '@mui/material';
import {toast} from 'sonner';

export const getStuff = async type => {
  console.log('getStuff:', type);
  if (type) {
    const {data} = await axios.get(
      'https://shoes-shop-strapi.herokuapp.com/api/' + type,
    );
    return data;
  }
  return null;
};

export const registerNewUser = async userObj => {
  console.log('registerNewUser:', userObj);
  if (!userObj) return null;
  const {data} = await axios.post(
    'https://shoes-shop-strapi.herokuapp.com/api/auth/local/register',
    userObj,
  );
  return data;
};

export const forgotPassword = async email => {
  try {
    console.log('forgotPassword:', email);
    if (!email) return null;
    const res = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password',
      {email: email},
    );
    return res;
  } catch (error) {
    // Extract the error message from the server response and throw it
    const errorMessage = error?.response?.data?.error?.message;
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (
  newPassword,
  passwordConfirmation,
  code,
) => {
  try {
    console.log('resetPassword:', newPassword);
    if (!newPassword) return null;
    const res = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/reset-password',
      {
        password: newPassword,
        passwordConfirmation: passwordConfirmation,
        code: code,
      },
    );
    return res;
  } catch (error) {
    // Extract the error message from the server response and throw it
    const errorMessage = error?.response?.data?.error?.message;
    throw new Error(errorMessage);
  }
};

export const SkeletonProducts = () => {
  return Array(20)
    .fill()
    .map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        width={300}
        height={300}
        sx={{margin: '25px'}}
      />
    ));
};

export const checkErrorEmail = (email, setEmailError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    setEmailError(false);
    return false;
  } else {
    setEmailError(true);
    return true;
  }
};

export const checkErrorPassword = (password, setPasswordError) => {
  const emailRegex = /^\S{8,}$/;
  if (emailRegex.test(password)) {
    setPasswordError(false);
    return false;
  } else {
    setPasswordError(true);
    return true;
  }
};

export const checkErrorName = (name, setNameError) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{2,10}$/;
  if (usernameRegex.test(name) && !/\s/.test(name)) {
    setNameError(false);
    return false;
  } else {
    setNameError(true);
    return true;
  }
};

export const checkErrorConfirm = (
  password,
  confirmPassword,
  setConfirmPasswordError,
) => {
  if (password === confirmPassword) {
    setConfirmPasswordError(false);
    return false;
  } else {
    setConfirmPasswordError(true);
    return true;
  }
};

export const executeError = message => {
  toast.error(message);
};

export const executeSucces = message => {
  toast.success(message);
};

export const executeInfo = (message, description) => {
  toast.message(message, {
    description: description,
    action: {
      label: 'Go',
      onClick: () => window.open('https://mail.google.com/mail/u/0/#inbox'),
    },
  });
};

export const uploadImages = async (arrImages, jwt) => {
  const formData = new FormData();
  arrImages.forEach(file => {
    formData.append('files', file.file);
  });

  try {
    const response = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + jwt,
        },
      },
    );
    console.log('Respuesta de la API:', response);

    const {data: arrImgId} = response;

    return arrImgId?.map(img => img.id);
  } catch (error) {
    // Aquí puedes manejar el error de la API si ocurre alguno

    console.error('Error al enviar los archivos:', error);
  }
};

export const createProduct = async (
  genders,
  select,
  brands,
  categories,
  sizes,
  name,
  arrImgId,
  description,
  id,
  jwt,
) => {
  const idGender = String(
    genders.find(gender => gender.name === select.gender)?.id,
  );
  const idBrand = String(brands.find(brand => brand.name === select.brand)?.id);

  const categoriesArr = categories
    .filter(category => category.needed)
    .map(category => String(category.id));

  const sizesArr = sizes
    .filter(size => size.needed)
    .map(size => String(size.id));

  const obj = {
    data: {
      name: name,
      images: arrImgId,
      description: description,
      brand: idBrand,
      categories: categoriesArr,
      gender: idGender,
      size: sizesArr,
      price: 100,
      userID: id,
      teamName: 'fb-team',
      uniqueID: generateRandomNumber(10),
      sitemap_exclude: true,
    },
  };

  try {
    const res = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/products',
      obj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      },
    );

    if (res.status == '200') {
      console.log('succesfully: ', res.data);
      executeSucces('Product created succesfully.');
      return res;
    }
    console.log('res: ', res);
  } catch (error) {
    console.log('ERROR API PRODUCT: ', error);
    executeError('There was an error.');
    executeError('There was an error.');

  }
};

function generateRandomNumber(length) {
  let randomNumber = '';

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10); // Genera un dígito aleatorio entre 0 y 9
    randomNumber += digit.toString(); // Agrega el dígito al número aleatorio
  }

  return randomNumber;
}
