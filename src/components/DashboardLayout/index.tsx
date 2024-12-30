import { useAppContext } from '../../providers/AppProvider';
import {ReactNode, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from 'react-icons/ri';
import {isTokenValid} from "../../helpers/utils.ts";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { token, setToken, setName } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken!('');
    setName!('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!token || !isTokenValid(token)) {
      setToken!('');
      setName!('');
      navigate('/login');
    }
  }, [navigate, setName, setToken, token]);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            {
              isSidebarOpen ? (
                <button
                  onClick={toggleSidebar}
                  className="text-white mr-2 rounded-full hover:bg-blue-500 p-2"
                >
                  <RiMenuUnfold2Fill size={24} />
                </button>
              ) : (
                <button
                  onClick={toggleSidebar}
                  className="text-white mr-2 rounded-full hover:bg-blue-500 p-2"
                >
                  <RiMenuFold2Fill size={24} />
                </button>
              )
            }
            <h1 className="text-lg font-semibold">Task Manager</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1 pt-16">
        {
          isSidebarOpen && (
            <aside className="bg-gray-800 text-white w-64 fixed h-full top-16 left-0">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link to="/tasks"><p className="text-left w-full px-4 py-2 rounded hover:bg-gray-700">Tasks</p></Link>
                  </li>
                  <li>
                    <Link to="/create-task"><p className="text-left w-full px-4 py-2 rounded hover:bg-gray-700">Create Task</p></Link>
                  </li>
                </ul>
              </nav>
            </aside>
          )
        }
        <main className={`flex-1 bg-gray-100 p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
};

export default DashboardLayout;
