import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const ErrorFilter = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Error filter</div>
    </NavBarLayout>
  );
};

export default ErrorFilter;
