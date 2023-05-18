import {useSession} from 'next-auth/react';

const useUser = () => {
  const {data, status} = useSession();

  const user = data?.user?.user;

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
  };
};

export default useUser;
