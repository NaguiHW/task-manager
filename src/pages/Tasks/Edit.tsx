import DashboardLayout from "../../components/DashboardLayout";
import {useAppContext} from "../../providers/AppProvider";
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {formatErrorMessage} from "../../helpers/utils";

const EditTask = () => {
  const { token } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/tasks');
      toast.success('Task updated successfully');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(formatErrorMessage(error.response.data.errors));
      } else {
        toast.error('Error creating task');
      }
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTaskData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTask();
  }, [id, token]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center bg-gray-100 h-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Task</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                placeholder="My Title"
                value={taskData.title}
                onChange={(e) => setTaskData({...taskData, title: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                id="description"
                placeholder="My Description"
                value={taskData.description}
                onChange={(e) => setTaskData({...taskData, description: e.target.value})}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditTask;
