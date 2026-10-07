import { useCallback, useEffect, useState } from 'react';
import { taskService } from '../services/taskService.js';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await taskService.getTasks();

      setTasks(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      setError('');

      const newTask = await taskService.createTask(taskData);

      setTasks((currentTasks) => [...currentTasks, newTask]);

      return newTask;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const deleteTask = async (id) => {
    try {
      setError('');

      await taskService.deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    deleteTask,
    createTask,
  };
};

export default useTasks;
