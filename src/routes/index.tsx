import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Tasks from "../pages/Tasks";

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <SignUp />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      }
    ],
  }
];

export const router = createBrowserRouter(routes);

export default routes;
