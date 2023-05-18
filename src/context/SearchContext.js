import React, {createContext, useState, useContext} from 'react';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <SearchContext.Provider value={{searchExpanded, setSearchExpanded}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
