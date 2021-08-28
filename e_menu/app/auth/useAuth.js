import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import AuthContext from './context';
import storage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    storage.removeToken();
  };

  const login = (token) => {
    setUser(jwtDecode(token));
    storage.storeToken(token);
  };

  const anonymousLogin = () => {
    setUser({role: "customer"})
  }

  return { user, login, logout, anonymousLogin };
};

export default useAuth;
