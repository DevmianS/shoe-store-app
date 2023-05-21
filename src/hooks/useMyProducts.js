import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import useUser from './useUser';
import {useCallback, useEffect, useState} from 'react';

const useMyProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const {id} = useUser();

  const queryMyProducts = useCallback(async id => {
    setIsLoading(true);
    const {data} = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        `/products?filters[teamName]=fb-team&filters[userID]=${id}&populate=*`,
    );
    setIsLoading(false);
    return data?.data;
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
