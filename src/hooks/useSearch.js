import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import useUser from './useUser';
import {useCallback, useEffect, useState} from 'react';
import {executeError} from '@/utils/utils';

const useSearchFilter = ({
  name,
  populate = '*',
  brand,
  color,
  gender,
  category,
  urlNavigator,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const queryMyProducts = useCallback(async ({populate, urlNavigator}) => {
    console.log('populate, urlNavigator');
    setIsLoading(true);
    let url;
    try {
      if (urlNavigator.includes('search?')) {
        //All search complex logic
        let usableUrl = urlNavigator?.split('search?')[1].split('&');
        console.log('usableUrl :', usableUrl);

        url = `/products?populate=${populate}&` + usableUrl;
      } else {
        // Normal product logic
        url = `/products?populate=${populate}`;
      }
      console.log('url is: ', url);
      const {data, ...res} = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + url,
      );
      setIsLoading(false);
      console.log('res is: ', res);
      return data?.data;
    } catch (error) {
      console.log('error: ', error);
      executeError(
        'There was an error with the application. Please Try again later or talk to support. Error: ' +
          error?.response?.data?.error?.name || '',
      );
    }
    setIsLoading(false);
    return [];
  }, []);

  useEffect(() => {
    async function test() {
      let prod = null;
      prod = await queryMyProducts({populate, urlNavigator});
      setProducts(prod);
    }
    test();
  }, [queryMyProducts, populate, urlNavigator]);

  return {products, isLoading};
};

export default useSearchFilter;
