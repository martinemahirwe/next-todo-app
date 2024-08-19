import { eq } from 'drizzle-orm';
import database from '../db/drizzle';
import { todolist, users } from '../db/schema';

export async function fetchTodos(userId: string) {
  return await database
    .select()
    .from(todolist)
    .where(eq(todolist.userId, userId));
}

export async function createTodo(task: string, userId: string) {
  return await database.insert(todolist).values({ task, userId });
}

export async function deleteTodo(taskId: string) {
  return await database.delete(todolist).where(eq(todolist.id, taskId));
}

export async function updateTodo(
  taskId: string,
  type: string,
  data: { description?: string; completed?: boolean }
) {
  if (type === 'description') {
    if (!data.description) {
      throw new Error('description is required');
    }

    return await database
      .update(todolist)
      .set({ task: data.description })
      .where(eq(todolist.id, taskId));
  }
  if (type === 'status') {
    if (data.completed === undefined) {
      throw new Error('completed status is required');
    }

    return await database
      .update(todolist)
      .set({ completed: data.completed })
      .where(eq(todolist.id, taskId));
  }

  throw new Error('Invalid type parameter');
}
export async function getCurrentUser(userId: string) {
  return await database
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
}
