'use client';
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
  AlertDialogDescription,
} from './ui/alert-dialog';
import { Props } from '@/types/todoType';
import { useTodoItem } from '@/hooks/useTodoItem';

const TodoItem = ({ todo }: Props) => {
  const {
    isCompleted,
    showUpdatePopup,
    handleIsCompleted,
    handleEdit,
    onSubmit,
    handleSubmit,
    handleCancel,
    handleDelete,
    register,
    errors,
    deleteTodoMutation,
    updateTodoMutation,
    setShowUpdatePopup,
  } = useTodoItem(todo);

  return (
    <div className="flex items-center justify-center p-4 border-gray-200 border-solid border mb-2 rounded text-black">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleIsCompleted}
        className="rounded"
      />
      <p
        className={`${
          todo.completed ? 'line-through' : ''
        } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
      >
        {todo.task}
      </p>
      <div className="flex gap-1 ml-auto">
        <Button
          onClick={handleEdit}
          className="bg-blue-500 text-blue-50 rounded w-14 px-2 py-1"
        >
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-red-500 w-16 text-red-50 rounded px-2 py-1"
              disabled={deleteTodoMutation.isPending}
            >
              {deleteTodoMutation.isPending ? 'Delete...' : 'Delete'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-red-400 rounded-lg p-6 w-96 text-black">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this task?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 text-white rounded px-4 py-2"
              >
                Delete
              </AlertDialogAction>
              <AlertDialogAction
                onClick={() => {}}
                className="bg-gray-500 text-white rounded px-4 py-2"
              >
                Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <AlertDialog open={showUpdatePopup} onOpenChange={setShowUpdatePopup}>
        <AlertDialogTrigger asChild>
          <div className="hidden"></div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white opacity-90 text-black rounded p-6 w-96">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Task</AlertDialogTitle>
            <AlertDialogDescription>
              Update your task below. Click &quot;Save&quot; to confirm changes
              or &quot;Cancel&quot; to discard them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('task', { required: true })}
              className="rounded w-full outline-none focus:outline-none"
            />
            {errors.task && <span>{errors.task.message}</span>}
            <AlertDialogFooter className="flex justify-end gap-2">
              <Button
                type="submit"
                className="bg-green-600 text-green-50 rounded px-4 py-2"
                disabled={updateTodoMutation.isPending}
              >
                {updateTodoMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-red-50 rounded px-4 py-2"
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TodoItem;
