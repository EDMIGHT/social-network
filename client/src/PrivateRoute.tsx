import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { IUserSlice } from '@/store/slices/user.slice';

interface PrivateRouteProps {
  user: IUserSlice['user'];
  children: ReactNode;
  redirect?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, user, redirect = '/signIn' }) => {
  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default PrivateRoute;
