import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {executeError} from '@/utils/utils';

const useProducts = (page = 1) => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      console.log('data: 1');

      try {
        const {data} = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            `/products?filters[teamName]=fb-team&populate=*&pagination[page]=${page}`,
        );
        return data;
      } catch (error) {
        console.log('error: ', error);
        executeError(
          'There was an error with the application. Please Try again later or talk to support. Error: ' +
            error?.response?.data?.error?.name || '',
        );
      }
      return [];
    },
    keepPreviousData: true,
  });

  return {data, isLoading, isError, error};
};

export default useProducts;
