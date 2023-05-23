import {cartInit, cartUpdate, valuesSum} from '@/utils/cart';
import {executeSucces} from '@/utils/utils';
import React, {createContext, useState, useContext, useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => cartInit());
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => cartUpdate(cartItems), [cartItems]);
  useEffect(() => {
    console.log(cartItems);
    setCartCount(valuesSum(cartItems));
  }, [cartItems]);

  const addProduct = ({productId, title}, isCart) => {
    console.log('ID!', productId);
    setCartItems(prev => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));
    setCartCount(prev => prev + 1);
    executeSucces(
      title +
        (isCart ? ' increased by 1 in your cart!' : ' added to your cart!'),
    );
  };

  const removeOneProduct = ({productId, title}) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0,
    }));
    setCartCount(prev => (prev > 0 ? prev - 1 : 0));
    executeSucces(title + ' decreased by 1 in your cart!');
  };

  const deleteProduct = ({productId, title}) => {
    const itemCount = cartItems[productId];
    setCartItems(prev => ({
      ...prev,
      [productId]: 0,
    }));
    setCartCount(prev => prev - itemCount);
    executeSucces(productId + ' was fully deleted from your cart!');
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
