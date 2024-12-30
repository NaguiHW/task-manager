import {useState, FormEvent, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../providers/AppProvider';
import {isTokenValid, setItemInStore} from '../../helpers/utils';

const Login = () => {
  const { token, setToken, setName } = useAppContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, loginData);

      const { name, token } = response.data;
      setName!(name);
      setToken!(token);
      setItemInStore('name', name);
      setItemInStore('token', token);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token && isTokenValid(token)) {
      navigate('/dashboard');
    } else {
      setToken!('');
      setName!('');
    }
  }, [navigate, setName, setToken, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              placeholder="email@example.com"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className="block text-center text-blue-500 hover:text-blue-600 mt-3">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
