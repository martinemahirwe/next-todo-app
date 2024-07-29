import { ReactNode } from "react";

export type todoType = {
    id: string;
    task: string;
    completed: boolean;
  };
  
 export interface RootLayoutProps {
    children: ReactNode;
    dehydratedState?: unknown; 
  }