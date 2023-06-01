import axios from 'axios';
import useUser from './useUser';
import {useQuery} from '@tanstack/react-query';
import {executeError} from '@/utils/utils';

const useMyProducts = () => {
  const {id} = useUser();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['products', 'my-products', id],
    queryFn: async () => {
      try {
        const {data} = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            `/products?filters[teamName]=fb-team&filters[userID]=${id}&populate=*`,
        );
        return data.data;
      } catch (error) {
        console.log('error: ', error);
        executeError(
          'There was an error with the application. Please Try again later or talk to support. Error: ' +
            error?.response?.data?.error?.name || '',
        );
      }
      return [];
    },
    enabled: !!id,
    keepPreviousData: true,
  });

  return {data, isLoading, isError, error};
};

export default useMyProducts;
