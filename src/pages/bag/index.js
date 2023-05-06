import React from 'react';
import style from './index.module.css';
import Cart from '@/components/UI/Cart';
import CartProductItem from '@/components/UI/CartProductItem';
import product1 from '@/assets/product1.jpg';
import product2 from '@/assets/product2.jpg';
import product3 from '@/assets/product3.jpg';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Bag = () => {
  const saveClickHandler = () => {
    console.log('SAVED');
  };
  const deleteClickHandler = () => {
    console.log('DELETED');
  };
  return (
    <NavBarLayout>
      <div className={style.test}>
        <Cart count={5} />
        <CartProductItem
          title="Nike Air Max 270"
          price="160"
          category="Women's Shoes"
          inStock={true}
          size={[36, 37, 38, 39]}
          color={['white', 'red', 'blue']}
          quantity={3}
          image={product1}
          onSave={saveClickHandler}
          onDelete={deleteClickHandler}
        />
        <CartProductItem
          title="Nike Air Max 90"
          price="140"
          category="Men's Shoes"
          inStock={true}
          size={[36, 37, 38, 39]}
          color={['white', 'red', 'blue']}
          quantity={3}
          image={product2}
          onSave={saveClickHandler}
          onDelete={deleteClickHandler}
        />
        <CartProductItem
          title="Nike Air Force 1 '07 SE"
          price="110"
          category="Women's Shoes"
          inStock={true}
          size={[36, 37, 38, 39]}
          color={['white', 'red', 'blue']}
          quantity={3}
          image={product3}
          onSave={saveClickHandler}
          onDelete={deleteClickHandler}
        />
      </div>
    </NavBarLayout>
  );
};

export default Bag;
