"use client";
import { FC } from "react";
import { todoType } from "@/types/todoType";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { createTask, removeTask, updateTaskStatus, updateTask } from "@/actions/todoActions";
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  todos: todoType[] | undefined;
}

const Todos: FC<Props> = ({ todos }) => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: string }) => createTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) => updateTaskStatus(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: string }) => updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const removeTaskMutation = useMutation({
    mutationFn: (id: string) => removeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const createTodo = (task: string) => {
    const id = uuidv4();
    createTaskMutation.mutate({ id, task });
  };

  const changeTodoText = (id: string, task: string) => {
    updateTaskMutation.mutate({ id, task });
  };

  const toggleIsTodoDone = (id: string, completed: boolean) => {
    updateTaskStatusMutation.mutate({ id, completed });
  };

  const deleteTodoItem = (id: string) => {
    removeTaskMutation.mutate(id);
  };

  return (
    <main className="flex flex-col text-center">
      <TodoForm AddTodo={createTodo} />
      <div className="flex flex-col mt-8 gap-2">
        {todos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsCompleted={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
    </main>
  );
};

export default Todos;
