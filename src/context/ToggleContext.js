import React, {createContext, useState, useContext} from 'react';

const ToggleContext = createContext();

export const ToggleProvider = ({children}) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <ToggleContext.Provider value={{isToggled, toggle}}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};
