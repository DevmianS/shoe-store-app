import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Home = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Home</div>
    </NavBarLayout>
  );
};

export default Home;
