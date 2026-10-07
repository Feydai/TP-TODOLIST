const API_URL = '/api/tasks';

const getHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || data.message || 'Une erreur est survenue'
    );
  }

  return data;
};

const getTasks = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response);
};

const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return handleResponse(response);
};

export const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
