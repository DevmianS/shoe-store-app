import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Error404 = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Error 404</div>
    </NavBarLayout>
  );
};

export default Error404;
