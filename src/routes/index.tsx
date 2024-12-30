import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/Tasks/Create";
import EditTask from "../pages/Tasks/Edit";

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
      },
      {
        path: '/tasks/:id/edit',
        element: <EditTask />,
      },
      {
        path: '/create-task',
        element: <CreateTask />,
      }
    ],
  }
];

export const router = createBrowserRouter(routes);

export default routes;
