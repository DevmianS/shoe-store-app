import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const AddProduct = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Add product</div>
    </NavBarLayout>
  );
};

export default AddProduct;
