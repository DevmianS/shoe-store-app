import {getOwnUser} from '@/utils/utils';
import {useQuery} from '@tanstack/react-query';
import {useSession} from 'next-auth/react';

const useUser = () => {
  const {data, status} = useSession();

  const jwt = data?.user?.jwt;
  const user = data?.user?.user;
  const id = user?.id;

  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getOwnUser(jwt, id),
  });

  const avatar = userQuery?.data?.avatar?.url;

  let username = null;
  if (user?.firstName && user?.lastName) {
    username = `${user.firstName} ${user.lastName}`;
  } else {
    username = user?.username;
  }

  let userInitials = null;
  if (username?.includes(' ')) {
    const [firstName, lastName] = username?.split(' ');
    userInitials = `${firstName[0]}${lastName[0]}`.toLocaleUpperCase();
  } else {
    userInitials = username?.substring(0, 2).toLocaleUpperCase();
  }

  return {
    avatar,
    name: username || '',
    status,
    data,
    initials: userInitials || '',
    jwt: jwt,
    id: id,
  };
};

export default useUser;
