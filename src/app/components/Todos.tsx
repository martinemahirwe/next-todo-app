'use client';
import { todoType } from '@/types/todoType';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useFetchTodos } from '@/hooks/useTodos';
import { useSession } from 'next-auth/react';
import Loading from '../todos/loading';

const Todos = () => {
  const { data: session } = useSession();
  const { data, error, isLoading, isError } = useFetchTodos(
    session?.user?.email
  );

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <main className="flex flex-col text-center">
      <TodoForm />
      <div className="flex flex-col mt-8 gap-2">
        {data?.map((todo: todoType) => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    </main>
  );
};

export default Todos;
