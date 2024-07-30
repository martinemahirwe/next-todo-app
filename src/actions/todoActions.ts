"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import database from "@/db/drizzle";
import { todolist } from "@/db/schema";

export const fetchTasks = async (userEmail:string) => {
  const tasks = await database.select().from(todolist).where(eq(todolist.userEmail, userEmail));
  return tasks;
};

export const createTask = async (id:string,description: string, userEmail:string) => {
  await database.insert(todolist).values({
    id:id,
    task: description,
    userEmail: userEmail
  });
  revalidatePath("/todos");
};

export const removeTask = async (taskId: string) => {
  await database.delete(todolist).where(eq(todolist.id, taskId));

  revalidatePath("/todos");
};

export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  await database
    .update(todolist)
    .set({
      completed: completed,
    })
    .where(eq(todolist.id, taskId));

  revalidatePath("/todos");
};

export const updateTask = async (taskId: string, description: string) => {
  await database
    .update(todolist)
    .set({
      task: description,
    })
    .where(eq(todolist.id, taskId));

  revalidatePath("/todos");
};
