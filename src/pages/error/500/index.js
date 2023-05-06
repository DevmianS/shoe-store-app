import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Error500 = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Error 500</div>
    </NavBarLayout>
  );
};

export default Error500;
