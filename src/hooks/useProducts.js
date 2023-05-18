import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

const useProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {data} = await axios.get(
        'https://shoes-shop-strapi.herokuapp.com/api/products?filters[teamName]=fb-team&populate=*',
      );
      return data?.data;
    },
  });

  return {products, isLoading, isError, error};
};

export default useProducts;
