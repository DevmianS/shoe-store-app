import React, {createContext, useState, useContext} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems') || {}),
  );
  console.log(cartItems);
  const addProduct = title => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] ? prev[title] + 1 : 1,
    }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  const removeProduct = title => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] > 0 ? prev[title] - 1 : 0,
    }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <CartContext.Provider value={{cartItems, addProduct, removeProduct}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
