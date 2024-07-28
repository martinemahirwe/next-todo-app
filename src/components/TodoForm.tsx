"use client";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction
} from "./ui/alert-dialog"; 

interface Props {
  AddTodo: (value: string) => void;
}

const CreateTodolist: FC<Props> = ({ AddTodo }) => {
  const [todo, setTodo] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      AddTodo(todo);
      setTodo("");
    }
  };

  return (
    <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className="flex items-center justify-center w-16 h-16 mt-9 bg-green-700 text-green-50 rounded-full shadow-lg cursor-pointer"
              aria-label="Add Todo"
            >
              <AiOutlinePlus className="text-2xl" />
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="">Add a New Todo</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="gap-3 flex flex-col items-start justify-center rounded p-4">
              <Input
                type="text"
                className="px-4 py-2 border border-gray-200 outline-none focus:outline-none"
                value={todo}
                onChange={handleInputChange}
                placeholder="Type your todo here..."
                title="Text Input"
              />
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={handleAdd}
                  className="bg-green-700 text-green-50 rounded px-4 py-2"
                >
                  Add Todo
                </AlertDialogAction>
                <AlertDialogAction
                  className="bg-gray-500 text-white rounded px-4 py-2"
                >
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};

export default CreateTodolist;
