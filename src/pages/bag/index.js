import React from 'react';
import style from './index.module.css';
import Cart from '@/components/UI/Cart';

const Bag = () => {
  return (
    <div className={style.test}>
      <Cart count={5} />
    </div>
  );
};

export default Bag;
