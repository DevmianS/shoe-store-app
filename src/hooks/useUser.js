import {useSession} from 'next-auth/react';

const useUser = () => {
  const {data, status} = useSession();

  const user = data?.user?.user;

  const jwt = data?.user?.jwt;

  const id = user?.id;

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
    name: username || '',
    status,
    data,
    initials: userInitials || '',
    jwt: jwt,
    id: id,
  };
};

export default useUser;
