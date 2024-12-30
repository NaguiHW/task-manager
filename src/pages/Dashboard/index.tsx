import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/AppProvider';
import { isTokenValid } from '../../helpers/utils';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard = () => {
  const { token, setToken, setName } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !isTokenValid(token)) {
      setToken!('');
      setName!('');
      navigate('/login');
    }
  }, [navigate, setName, setToken, token]);

  return (
    <DashboardLayout>
      <main className="flex justify-center items-center flex-col">
        <h2 className="text-xl font-bold mb-4">Welcome to Task Manager</h2>
        <p>Please choose an option to start.</p>
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;
