import { ReactNode } from 'react';

export type todoType = {
  id?: string;
  task: string;
  completed?: boolean;
  userEmail: string;
};

export interface RootLayoutProps {
  children: ReactNode;
  dehydratedState?: unknown;
}
export type ParamType = { type: string };
