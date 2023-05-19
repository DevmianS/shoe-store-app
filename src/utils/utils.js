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

// export const logIn = async userObj => {
//   console.log('Login:', userObj);
//   if (!userObj) return null;
//   const {data} = await axios.post(
//     'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
//     userObj,
//   );
//   console.log(data);
//   localStorage.setItem(
//     'user',
//     JSON.stringify({
//       jwt: data.jwt,
//       userData: data.user,
//     }),
//   );
//   return data;
// };
