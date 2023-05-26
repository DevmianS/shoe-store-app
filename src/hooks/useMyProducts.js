import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import useUser from './useUser';
import {useCallback, useEffect, useState} from 'react';
import {executeError} from '@/utils/utils';

import NoContent from '@/components/UI/NoContent';

const useMyProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const {id} = useUser();

  const queryMyProducts = useCallback(async id => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          `/products?filters[teamName]=fb-team&filters[userID]=${id}&populate=*`,
      );
      setIsLoading(false);
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

  console.log('userID: ', id, isLoading);

  useEffect(() => {
    async function test() {
      let prod = null;
      if (id) {
        prod = await queryMyProducts(id);
      }
      setProducts(prod);
    }
    test();
  }, [id, queryMyProducts]);

  return {products, isLoading};
};

export default useMyProducts;
