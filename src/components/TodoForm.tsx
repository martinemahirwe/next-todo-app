"use client";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  AddTodo: (value: string) => void;
}

const CreateTodolist: FC<Props> = ({ AddTodo }) => {
  const [todo, setTodo] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAdd = async () => {
    if (todo.trim()) {
      AddTodo(todo);
      setTodo("");
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(true);
  };

  return (
    <div className="mt-8">
      {isFormVisible ? (
        <div className="gap-2 flex items-center justify-center">
          <Input
            type="text"
            className="px-4 py-2 border border-gray-200 rounded outline-none focus:outline-none"
            value={todo}
            onChange={handleInputChange}
            placeholder="Type your todo here..."
            title="Text Input"
          />
          <Button
            className="bg-green-700 text-green-50 rounded px-4 py-2"
            onClick={handleAdd}
          >
            Add Todo
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div
            className="flex items-center justify-center w-12 h-12 bg-green-700 text-green-50 rounded-full shadow-lg cursor-pointer"
            onClick={toggleFormVisibility}
            aria-label="Add Todo"
          >
            <AiOutlinePlus className="text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTodolist;
