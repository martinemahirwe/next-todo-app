import { todoType } from '@/types/todoType';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodos = async (userEmail: string) => {
  try {
    const response = await apiClient.get('/', { params: { userEmail } });
    return response.data;
  } catch (error: any) {
    throw new Error('Error fetching todos', error);
  }
};

export const createTodo = async (data: todoType) => {
  try {
    const response = await apiClient.post('/', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating todo:', error.message);
    throw new Error(error);
  }
};

export const deleteTodo = async (taskId: string) => {
  try {
    const response = await apiClient.delete('/', { data: { taskId } });
    return response.data;
  } catch (error: any) {
    throw new Error('Error deleting todo', error);
  }
};

export const updateTodo = async (
  taskId: string,
  completed?: boolean,
  description?: string,
  type?: string
) => {
  try {
    let response;

    if (type === 'status') {
      response = await apiClient.patch(
        `/${type}`,
        { taskId, completed },
        { params: { type } }
      );
    } else if (type === 'description') {
      response = await apiClient.patch(
        `/${type}`,
        { taskId, description },
        { params: { type } }
      );
    } else {
      throw new Error('Invalid route for update');
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating todo ${type}`, error);
  }
};
