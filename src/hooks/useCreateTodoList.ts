import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { userSchema } from '@/lib/validations/formValidations';
import { useCreateTodo } from '@/hooks/useTodos';

interface IFormInput {
  task: string;
}

export const useCreateTodolist = () => {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

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
      createTodoMutation.mutate(
        {
          task: data.task,
          userId: session?.user.id as string,
        },
        {
          onSuccess: () => {
            toast.success('Task Added');
            setShowPopup(false);
            reset();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    reset();
  };

  return {
    showPopup,
    setShowPopup,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleCancel,
    createTodoMutation,
  };
};
