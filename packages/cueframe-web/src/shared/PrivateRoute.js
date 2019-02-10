import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

export default ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      render={({ location: referrer }) => (
        isAuthenticated ? (
          <Component />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { referrer }
          }} />
        )
      )}
    />
  );
};