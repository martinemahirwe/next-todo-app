'use client';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import Loading from '../todos/loading';
import { List } from 'react-movable';
import { useTodos } from '@/hooks/useDrag';

const Todos = () => {
  const { todos, isLoading, isError, error, handleReorder } = useTodos();

  if (isError) return <div>Error: {error?.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <main className="flex flex-col text-center">
      <TodoForm />
      <List
        values={todos}
        onChange={handleReorder}
        renderList={({ children, props }) => (
          <ul {...props} className="flex flex-col mt-8 gap-2">
            {children}
          </ul>
        )}
        renderItem={({ value, props }) => (
          <li {...props}>
            <TodoItem key={value.id} todo={value} />
          </li>
        )}
      />
    </main>
  );
};

export default Todos;
