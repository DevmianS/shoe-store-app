import axios from 'axios';
import {Skeleton} from '@mui/material';
import {toast} from 'sonner';

export const getStuff = async type => {
  if (type) {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + +type);
    return data;
  }
  return null;
};

export const registerNewUser = async userObj => {
  if (!userObj) return null;
  const {data} = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + '/auth/local/register',
    userObj,
  );
  return data;
};

export const forgotPassword = async email => {
  try {
    if (!email) return null;
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/forgot-password',
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
    if (!newPassword) return null;
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/reset-password',
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
      process.env.NEXT_PUBLIC_API_URL + '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + jwt,
        },
      },
    );

    const {data: arrImgId} = response;

    return arrImgId?.map(img => img.id);
  } catch (error) {
    // Aquí puedes manejar el error de la API si ocurre alguno

    console.error('Error al enviar los archivos:', error);
  }
};

export const validationCreateProduct = async ({
  genders,
  price,
  categories,
  sizes,
  name,
  arrImages,
  description,
  id,
  jwt,
}) => {
  if (
    !name ||
    typeof name !== 'string' ||
    name.length < 1 ||
    name.length > 20
  ) {
    executeError('Error: The name must be between 1 and 20 characters.');
    return true;
  } else {
    const isNameUsed = await fetchProductsByName(name);
    if (isNameUsed) {
      executeError('Error: The name already exists. Choose a new one.');
      return true;
    }
  }

  if (
    !description ||
    typeof description !== 'string' ||
    description.length < 1 ||
    description.length > 200
  ) {
    executeError(
      'Error: The description must be between 1 and 200 characters.',
    );
    return true;
  }

  // Price validation
  if (
    !price ||
    typeof parseFloat(price) !== 'number' ||
    price < 1 ||
    price > 100000
  ) {
    executeError(
      'Error: The price (' + price + ') must be a number between 1 and 100000.',
    );
    return true;
  }

  // Gender validation
  if (!genders || !Array.isArray(genders) || genders.length < 1) {
    executeError('Error: At least one gender is required.');
    return true;
  }

  // Size validation
  let sizeArrInvalid = true;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].needed === true) {
      sizeArrInvalid = false;
    }
  }
  if (sizeArrInvalid) {
    executeError('Error: At least one size is required.');
    return true;
  }

  // Category validation
  let categoriesArrInvalid = true;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].needed === true) {
      categoriesArrInvalid = false;
    }
  }
  if (categoriesArrInvalid) {
    executeError('Error: At least one category is required.');
    return true;
  }

  // Image validation
  let imgArrInvalid = true;
  for (let i = 0; i < arrImages.length; i++) {
    if (arrImages[i].file !== null) {
      imgArrInvalid = false;
    }
  }
  if (imgArrInvalid) {
    executeError('Error: At least one image is required.');
    return true;
  }

  if (String(id).length < 1 || String(jwt).length < 1) {
    executeError('Error: Log in again to add a product.');
    return true;
  }
  return false;
};

export const createProduct = async ({
  genders,
  select,
  brands,
  price,
  categories,
  sizes,
  name,
  arrImgId,
  description,
  id,
  jwt,
}) => {
  const idGender = String(
    genders.find(gender => gender.name == select.gender)?.id,
  );
  const idBrand = String(brands.find(brand => brand.name == select.brand)?.id);

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
      price: price,
      userID: id,
      teamName: 'fb-team',
      uniqueID: generateRandomNumber(10),
      sitemap_exclude: true,
    },
  };

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/products',
      obj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      },
    );

    if (res.status == '200') {
      executeSucces('Product created succesfully.');
      return res;
    }
  } catch (error) {
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

export const fetchProductsByName = async name => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL + `/products?filters%5Bname%5D=${name}`;
    const response = await axios.get(url);
    const {data, status} = response;

    // Utiliza la respuesta "data" como desees
    // ...
    if (status == '200') {
      return data?.meta?.pagination?.total > 0;
    } else {
      throw error;
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw error;
  }
};
