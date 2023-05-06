import React from 'react';
import style from './index.module.css';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Search = () => {
  return (
    <NavBarLayout>
      <div className={style.test}>Search results</div>
    </NavBarLayout>
  );
};

export default Search;
