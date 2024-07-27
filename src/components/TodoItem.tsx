"use client";
import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/types/todoType";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction } from "./ui/alert-dialog";

interface Props {
  todo: todoType;
  changeTodoText: (id: string, text: string) => void;
  toggleIsCompleted: (id: string, completed: boolean) => void;
  deleteTodoItem: (id: string) => void;
}

const TodoItem: FC<Props> = ({
  todo,
  changeTodoText,
  toggleIsCompleted,
  deleteTodoItem,
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.task);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleIsCompleted = async () => {
    toggleIsCompleted(todo.id, !isCompleted);
    setIsCompleted((prev) => !prev);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(todo.task);
  };

  const handleDelete = () => {
    deleteTodoItem(todo.id);
  };

  return (
    <div className="flex items-center justify-center p-4 border-gray-200 border-solid border mb-2 rounded">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleIsCompleted} className="rounded"/>
      {editing && !isCompleted ? (
        <Input
          value={text}
          onChange={handleTextChange}
          className="rounded ml-1 mr-1 outline-none focus:outline-none"
        />
      ) : (
        <p className={`${
          todo.completed ? "line-through" : ""
          } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
        >
          {text}
        </p>
      )}
      <div className="flex gap-1 ml-auto">
        {editing && !isCompleted ? (
          <Button
            onClick={handleSave}
            className="bg-green-600 text-green-50 rounded px-2 w-14 py-1"
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={handleEdit}
            className="bg-blue-500 text-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </Button>
        )}
        {editing && !isCompleted ? (
          <Button
            onClick={handleCancel}
            className="bg-red-500 w-16 text-red-50 rounded px-2 py-1"
          >
            Close
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 w-16 text-red-50 rounded px-2 py-1"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="p-4">
                Are you sure you want to delete this task?
              </div>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white rounded px-4 py-2">
                  Delete
                </AlertDialogAction>
                <AlertDialogAction className="bg-gray-500 text-white rounded px-4 py-2">
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
