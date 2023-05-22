import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

async function getProduct(id) {
  try {
    const response = await axios.get(
      `https://shoes-shop-strapi.herokuapp.com/api/products/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function ProductPage() {
  const router = useRouter();
  const {id} = router.query;
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery(['product', id], () => getProduct(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError && error.response.status.toString()[0] == '4') {
    router.push('/404');
    return <div>Error occurred while fetching product data</div>;
  }
  if (isError && error.response.status.toString()[0] == '5') {
    router.push('/500');
    return <div>Error occurred while fetching product data</div>;
  }
  console.log(product);
  return (
    <div>
      <h1>{product.data.id}</h1>
      <p>{product.data.attributes.name}</p>
    </div>
  );
}
