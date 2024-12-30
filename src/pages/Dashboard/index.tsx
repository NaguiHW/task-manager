import DashboardLayout from '../../components/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <main className="flex justify-center items-center flex-col">
        <h2 className="text-xl font-bold mb-4">Welcome to Task Manager</h2>
        <p>Please choose an option from the sidebar to start.</p>
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;
