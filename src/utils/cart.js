const isUndefined = variable => typeof variable === 'undefined';
const isBrowser = typeof window !== 'undefined';

const setStore = (name, obj) =>
  window.localStorage.setItem(name, JSON.stringify(obj));
const getStore = name => window.localStorage.getItem(name);

const cartInit = () => {
  if (!isBrowser) {
    return;
  }
  const USER_EMAIL = getStore('USER_EMAIL');
  const CART_DATA = getStore('CART_' + USER_EMAIL);
  if (!USER_EMAIL || !CART_DATA) {
    console.log('*******CART IS EMPTY*******');
    return {};
  }
  console.log('*******GET CART ITEMS*******', CART_DATA);
  return JSON.parse(CART_DATA);
};

const cartUpdate = items => {
  if (!isBrowser) {
    return;
  }
  const USER_EMAIL = getStore('USER_EMAIL');
  !isUndefined(USER_EMAIL) && setStore('CART_' + USER_EMAIL, items);
};

const valuesSum = items =>
  Object.values(items).reduce((acc, curr) => acc + curr, 0);

export {cartInit, cartUpdate, valuesSum, isBrowser, setStore};
