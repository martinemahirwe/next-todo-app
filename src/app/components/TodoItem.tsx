'use client';
import { useState } from 'react';
import { todoType } from '@/types/todoType';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from './ui/alert-dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/lib/validations/formValidations';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';

interface Props {
  todo: todoType;
}

interface IFormInput {
  task: string;
}

const TodoItem = ({ todo }: Props) => {
  const [editing, setEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const deleteTodoMutation = useDeleteTodo(todo.id!);
  const updateTodoMutation = useUpdateTodo(todo.id!);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { task: todo.task },
    resolver: yupResolver(userSchema),
  });

  const handleIsCompleted = async () => {
    updateTodoMutation.mutate({ completed: !todo.completed, type: 'status' });
    setIsCompleted((prev) => !prev);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateTodoMutation.mutate({ description: data.task, type: 'description' });
    setEditing(false);
    toast.success('Task updated');
  };

  const handleCancel = () => {
    setEditing(false);
    reset();
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate();
    toast.success('Task deleted');
  };

  return (
    <div className="flex items-center justify-center p-4 border-gray-200 border-solid border mb-2 rounded">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleIsCompleted}
        className="rounded"
      />
      {editing && !isCompleted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-center gap-1"
        >
          <Input
            {...register('task', { required: true })}
            className="rounded ml-1 mr-1 outline-none focus:outline-none"
          />
          {errors.task && <span>{errors.task.message}</span>}
          <Button
            type="submit"
            className="bg-green-600 text-green-50 rounded px-2 w-16 py-1"
            disabled={updateTodoMutation.isPending}
          >
            {updateTodoMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 w-16 text-red-50 rounded px-2 py-1"
          >
            Cancel
          </Button>
        </form>
      ) : (
        <p
          className={`${
            todo.completed ? 'line-through' : ''
          } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
        >
          {todo.task}
        </p>
      )}
      <div className="flex gap-1 ml-auto">
        {!editing && (
          <Button
            onClick={handleEdit}
            className="bg-blue-500 text-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </Button>
        )}
        {!editing && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 w-16 text-red-50 rounded px-2 py-1"
                disabled={deleteTodoMutation.isPending}
              >
                {deleteTodoMutation.isPending ? 'Deleting...' : 'Delete'}
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
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 text-white rounded px-4 py-2"
                >
                  {deleteTodoMutation.isPending ? 'Deleting...' : 'Delete'}
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
