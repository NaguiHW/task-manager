import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAppContext } from '../../providers/AppProvider';
import { DataTaskType } from '../../types/taskType';
import Switch from '../../components/Switch';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {formatDateTime} from "../../helpers/utils.ts";
import {toast} from "react-toastify";

const Tasks = () => {
  const { token } = useAppContext();
  const [data, setData] = useState<DataTaskType | undefined>();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const handleSwitchChange = async (id: string, completed: boolean) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        completed: !completed
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Task updated successfully');
      await fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error('Error updating task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Tasks List</h1>
        {
          data && data.totalTasks > 0 ? (
            data.tasks.map((task) => (
              <div key={task.id} className={`w-full border border-${task.completed ? 'green' : 'red'}-500 rounded-xl p-2 mb-2`}>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p>{formatDateTime(task.createdAt)}</p>
                <div className="flex">
                  <p className="mr-2">Completed?</p>
                  <Switch
                    checked={task.completed}
                    onChange={() => handleSwitchChange(task.id, task.completed)}
                  />
                </div>
                <div className="flex">
                  <FaEdit className="mr-2 cursor-pointer text-green-500 size-6" />
                  <MdDeleteForever
                    className="cursor-pointer text-red-500 size-6"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )
        }
      </div>
    </DashboardLayout>
);
};

export default Tasks;
