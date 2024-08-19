import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInput, todoType } from '@/types/todoType';
import { userSchema } from '@/lib/validations/formValidations';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';

export function useTodoItem(todo: todoType) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  const handleIsCompleted = () => {
    updateTodoMutation.mutate(
      { completed: !todo.completed, type: 'status' },
      {
        onSuccess: () => {
          setIsCompleted((prev) => !prev);
        },
      }
    );
  };

  const handleEdit = () => {
    if (isCompleted) {
      toast.error("You can't edit a completed task");
      return;
    }
    setShowUpdatePopup(true);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateTodoMutation.mutate(
      { description: data.task, type: 'description' },
      {
        onSuccess: () => {
          toast.success('Task updated');
          setShowUpdatePopup(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setShowUpdatePopup(false);
    reset();
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Task deleted');
      },
    });
  };

  return {
    isCompleted,
    showUpdatePopup,
    register,
    handleSubmit,
    errors,
    handleIsCompleted,
    handleEdit,
    onSubmit,
    handleCancel,
    handleDelete,
    setShowUpdatePopup,
    deleteTodoMutation,
    updateTodoMutation,
  };
}
