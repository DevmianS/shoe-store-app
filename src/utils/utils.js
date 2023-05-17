import axios from 'axios';

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
