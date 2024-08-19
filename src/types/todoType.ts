import { ReactNode } from 'react';

export type todoType = {
  id?: string;
  task: string;
  userId: string;
  completed?: boolean;
};

export interface RootLayoutProps {
  children: ReactNode;
  dehydratedState?: unknown;
}
export type ParamType = { type: string };

export interface TodoListProps {
  onReorder: (newTodos: todoType[]) => void;
}

export interface Props {
  todo: todoType;
}

export interface IFormInput {
  task: string;
}
