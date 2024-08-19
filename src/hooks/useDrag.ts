import { todoType } from '@/types/todoType';
import { useFetchTodos } from '@/hooks/useTodos';
import { arrayMove } from 'react-movable';
import { useState, useEffect } from 'react';

export const useTodos = () => {
  const { data, error, isLoading, isError } = useFetchTodos();
  const [todos, setTodos] = useState<todoType[]>([]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const handleReorder = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  return {
    todos,
    isLoading,
    isError,
    error,
    handleReorder,
  };
};
