import React, {createContext, useState, useContext, useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const USER_EMAIL = window.localStorage.getItem('USER_EMAIL');
      if (USER_EMAIL) {
        const savedData = window.localStorage.getItem('CART_' + USER_EMAIL);
        return savedData ? JSON.parse(savedData) : {};
      }
    }
    return {};
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const USER_EMAIL = window.localStorage.getItem('USER_EMAIL');
      if (USER_EMAIL) {
        window.localStorage.setItem(
          'CART_' + USER_EMAIL,
          JSON.stringify(cartItems),
        );
      }
    }
  }, [cartItems]);

  useEffect(() => {
    const productCount = Object.values(cartItems).reduce(
      (acc, curr) => acc + curr,
      0,
    );
    setCartCount(productCount);
  }, [cartItems]);

  const addProduct = title => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] ? prev[title] + 1 : 1,
    }));
    setCartCount(prev => prev + 1);
  };

  const removeProduct = title => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] > 0 ? prev[title] - 1 : 0,
    }));
    setCartCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <CartContext.Provider
      value={{
        setCartItems,
        setCartCount,
        cartItems,
        cartCount,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
