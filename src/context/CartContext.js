import {cartInit, cartUpdate, valuesSum} from '@/utils/cart';
import {executeSucces} from '@/utils/utils';
import React, {createContext, useState, useContext, useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => cartInit());
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => cartUpdate(cartItems), [cartItems]);
  useEffect(() => {
    setCartCount(valuesSum(cartItems));
  }, [cartItems]);

  const addProduct = (title, isCart) => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] ? prev[title] + 1 : 1,
    }));
    setCartCount(prev => prev + 1);
    executeSucces(
      title +
        (isCart ? ' increased by 1 in your cart!' : ' added to your cart!'),
    );
  };

  const removeOneProduct = title => {
    setCartItems(prev => ({
      ...prev,
      [title]: prev[title] > 0 ? prev[title] - 1 : 0,
    }));
    setCartCount(prev => (prev > 0 ? prev - 1 : 0));
    executeSucces(title + ' decreased by 1 in your cart!');
  };

  const deleteProduct = title => {
    const itemCount = cartItems[title];
    setCartItems(prev => ({
      ...prev,
      [title]: 0,
    }));
    setCartCount(prev => prev - itemCount);
    executeSucces(title + ' was fully deleted from your cart!');
  };

  return (
    <CartContext.Provider
      value={{
        setCartItems,
        setCartCount,
        cartItems,
        cartCount,
        addProduct,
        removeOneProduct,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
