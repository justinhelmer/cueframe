import React, { useState, useLayoutEffect } from 'react';
import { withCookies } from 'react-cookie';

const AuthContext = React.createContext();

const AuthProvider = withCookies(({ children, cookies }) => {
  const uidCookie = cookies.get('user.id');
  const [isAuthenticated, setIsAuthenticated] = useState(uidCookie);
  const [user, setUser] = useState({});
  const [userDataReady, setUserDataReady] = useState();

  const setUserSession = async (resp) => {
    setUser(await resp.json());
    setIsAuthenticated(true);
  };

  const killUserSession = () => {
    cookies.remove('user.id');
    setUser({});
    setIsAuthenticated(false);
  }

  const login = async (email, password) => {
    const resp = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (resp.ok) {
      await setUserSession(resp);
    } else {
      const err = new Error('User login failed');
      err.resp = resp;
      throw err;
    }
  };

  const logout = async () => {
    const resp = await fetch('/api/user/logout', { method: 'POST' });

    if (resp.ok) {
      killUserSession();
    } else {
      const err = new Error('User logout failed');
      err.resp = resp;
      throw err;
    }
  };

  // on a page refresh, if the user has a logged in cookie, fetch user data. use layout effect so the fetch promise can be passed to context consumers
  useLayoutEffect(() => {
    if (uidCookie && !user.id) {
      const promise = fetch(`/api/user/${uidCookie}`)
        .then((resp) => {
          if (resp.ok) {
            return setUserSession(resp);
          } else {
            killUserSession();
          }
        });

      setUserDataReady(promise);
    } else {
      setUserDataReady(Promise.resolve());
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userDataReady,
      user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
});

export { AuthContext, AuthProvider };