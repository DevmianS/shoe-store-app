import {useRouter} from 'next/router';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

import qs from 'qs';

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
  const prevQuery = useRef('');

  const [arrIdFilters, setArrIdFilters] = useState({
    name: [],
    brands: [],
    colors: [],
    sizes: [],
    categories: [],
    genders: [],
    minPrice: [],
    maxPrice: [],
  });

  const router = useRouter();

  function navigateToSearch() {
    console.log("I'm going no navigate: ", arrIdFilters);

    const query = qs.stringify(
      {
        filters: {
          name: {
            $containsi: arrIdFilters.name || [],
          },
          size: {
            $eq: arrIdFilters.sizes
              .filter(obj => obj.needed)
              .map(obj => obj.id),
          },
          brand: arrIdFilters.brands
            .filter(obj => obj.needed)
            .map(obj => obj.id),
          category: arrIdFilters.categories
            .filter(obj => obj.needed)
            .map(obj => obj.id),
          gender: arrIdFilters.genders
            .filter(obj => obj.needed)
            .map(obj => obj.id),
          color: arrIdFilters.colors
            .filter(obj => obj.needed)
            .map(obj => obj.id),
          price: {
            $gte: arrIdFilters.minPrice || [],
            $lte: arrIdFilters.maxPrice || [],
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    console.log('Query: ', JSON.stringify(query));

    if (JSON.stringify(query) !== JSON.stringify(prevQuery.current)) {
      console.log('Passed');
      router.push('search?' + query);
    }

    console.log('prevQuery.current: ', JSON.stringify(prevQuery.current));

    prevQuery.current = query;
  }

  useEffect(() => {
    navigateToSearch();
  }, [arrIdFilters]);

  useEffect(() => {
    if (!router.asPath.includes('search')) {
      prevQuery.current = '';
    }
  }, [router]);

  return (
    <FilterContext.Provider
      value={{arrIdFilters, setArrIdFilters, navigateToSearch}}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(FilterContext);
};
