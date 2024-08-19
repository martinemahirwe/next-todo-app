'use client';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCreateTodolist } from '@/hooks/useCreateTodoList';

const CreateTodolist = () => {
  const {
    showPopup,
    setShowPopup,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleCancel,
    createTodoMutation,
  } = useCreateTodolist();

  return (
    <div className="z-10">
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogTrigger>
          <div
            className="flex items-center justify-center w-16 h-16 mt-9 bg-green-700 text-green-50 rounded-full shadow-lg cursor-pointer"
            aria-label="Add Todo"
          >
            <AiOutlinePlus className="text-2xl" />
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle className="">Add a New Todo</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Please enter your new todo item below. Fill in the task and click
            Add Todo to save it.
          </AlertDialogDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-3 flex flex-col items-start justify-center rounded p-4">
              <Input
                type="text"
                className="px-4 py-2 border border-gray-200 outline-none focus:outline-none"
                {...register('task', { required: 'Task is required' })}
                placeholder="Type your todo here..."
                title="Text Input"
              />
              {errors.task && (
                <span className="text-red-500">{errors.task.message}</span>
              )}
              <AlertDialogFooter>
                <Button
                  type="submit"
                  className="bg-green-700 text-green-50 rounded px-4 py-2"
                >
                  {createTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
                </Button>
                <Button
                  className="bg-gray-500 text-white rounded px-4 py-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </AlertDialogFooter>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateTodolist;
