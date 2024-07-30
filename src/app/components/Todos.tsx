'use client';
import { todoType } from '@/types/todoType';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useFetchTodos } from '@/hooks/useTodos';
import { useSession } from 'next-auth/react';
import { ColorRing } from 'react-loader-spinner';

const Todos = () => {
  const { data: session } = useSession();
  const { data, error, isLoading, isError } = useFetchTodos(
    session?.user?.email
  );

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50 bg-opacity-50">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );

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
