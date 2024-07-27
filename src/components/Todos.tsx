"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoType";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { createTask, removeTask, updateTaskStatus, updateTask } from "@/actions/todoActions";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {

  const createTodo = (task: string) => {
    const id = uuidv4();
    createTask(id, task);
  };

  const changeTodoText = (id: string, task: string) => {
    updateTask(id, task);
  };

  const toggleIsTodoDone = (id: string, completed: boolean) => {
    updateTaskStatus(id, completed);
  };

  const deleteTodoItem = (id: string) => {
    removeTask(id);
  };

  return (
    <main className="flex flex-col text-center">
      <TodoForm AddTodo={createTodo} />
      <div className="flex flex-col mt-8 gap-2">
        {todos.map((todo) => (
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
