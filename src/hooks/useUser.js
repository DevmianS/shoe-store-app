import {useSession} from 'next-auth/react';

const useUser = () => {
  const {data, status} = useSession();

  const username = data?.user?.user?.username;

  return {
    name: username || '',
    status,
    data,
    initials: (username && username.substring(0, 2).toUpperCase()) || '',
  };
};

export default useUser;
