'use client';
import { Input } from './ui/input';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from './ui/alert-dialog';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/lib/validations/formValidations';
import { useCreateTodo } from '@/hooks/useTodos';

interface IFormInput {
  task: string;
}

const CreateTodolist = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
  });

  const createTodoMutation = useCreateTodo();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.task.trim() && !errors.task) {
      createTodoMutation.mutate({
        task: data.task,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        userEmail: session?.user?.email!,
      });
      reset();
      toast.success('task added');
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
                <AlertDialogAction
                  type="submit"
                  className="bg-green-700 text-green-50 rounded px-4 py-2"
                >
                  Add Todo
                </AlertDialogAction>
                <AlertDialogAction className="bg-gray-500 text-white rounded px-4 py-2">
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateTodolist;
