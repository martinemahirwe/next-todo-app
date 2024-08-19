import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../lib/fetchApis';

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ task, userId }: { task: string; userId: string }) =>
      createTodo({ task, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error creating todo:', error.message);
    },
  });
};

export const useDeleteTodo = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTodo(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error deleting todo:', error);
    },
  });
};

export const useUpdateTodo = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      completed,
      description,
      type,
    }: {
      completed?: boolean;
      description?: string;
      type: string;
    }) => updateTodo(taskId, completed, description, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error updating todo:', error);
    },
  });
};
