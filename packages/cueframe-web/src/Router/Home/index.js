import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Loadable from '../../shared/Loadable';

export default () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const Splash = Loadable(() => import('./Splash'));
  return <Splash />
}