import React from 'react';

import NavBar from '@/components/UI/NavBar';

const NavBarLayout = ({children}) => {
  return (
    <>
      <NavBar />

      <main>{children}</main>
    </>
  );
};

export default NavBarLayout;
