import { useEffect } from 'react';
import { useNavigate}  from 'react-router-dom';
import {useAppContext} from '../../providers/AppProvider';
import Dashboard from '../Dashboard';
import Login from '../Login';
import {isTokenValid} from '../../helpers/utils';

const Home = () => {
  const { token, setToken, setName } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !isTokenValid(token)) {
      setToken!('');
      setName!('');
      navigate('/login');
    }
  }, [navigate, setName, setToken, token]);

  return token ? (
    <Dashboard />
  ) : (
    <Login />
  )
};

export default Home;
