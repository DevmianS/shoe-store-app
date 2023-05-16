import axios from 'axios';

export default async function handler(req, res) {
  console.log('works!!!');
  const userObj = req.body;
  if (req.method === 'POST') {
    console.log('Login:', userObj);
    if (!userObj) return null;
    const {data} = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
      userObj,
    );
    console.log(data);
  }
}

// export const logIn = async userObj => {
//   console.log('Login:', userObj);
//   if (!userObj) return null;
//   const {data} = await axios.post(
//     'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
//     userObj,
//   );
//   console.log(data);

//   return data;
// };
