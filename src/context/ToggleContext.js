import React, {createContext, useState, useContext} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {theme} from '@/utils/theme';

const ToggleContext = createContext();

export const ToggleProvider = ({children}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggle = () => {
    if (isToggled) {
      setTimeout(() => setShowFilter(false), 500);
    } else {
      setShowFilter(false);
    }
    setIsToggled(prevState => !prevState);
  };
  const filterToggle = () => {
    if (isMobile) {
      setShowFilter(true);
      setIsToggled(true);
    } else {
      setShowFilter(prev => !prev);
    }
  };

  return (
    <ToggleContext.Provider
      value={{
        isToggled,
        setIsToggled,
        toggle,
        showFilter,
        setShowFilter,
        filterToggle,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};
