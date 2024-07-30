import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import database from '@/db/drizzle';
import { todolist } from '@/db/schema';
import { ParamType } from '@/types/todoType';

export async function PATCH(
  req: NextRequest,
  { params }: { params: ParamType }
) {
  try {
    const { type } = params;
    const { taskId, description, completed } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId is required' },
        { status: 400 }
      );
    }

    if (type === 'description') {
      if (!description) {
        return NextResponse.json(
          { error: 'description is required' },
          { status: 400 }
        );
      }

      await database
        .update(todolist)
        .set({ task: description })
        .where(eq(todolist.id, taskId));

      return NextResponse.json({
        message: 'Task description updated successfully',
      });
    }
    if (type === 'status') {
      if (completed === undefined) {
        return NextResponse.json(
          { error: 'completed status is required' },
          { status: 400 }
        );
      }

      await database
        .update(todolist)
        .set({ completed })
        .where(eq(todolist.id, taskId));

      return NextResponse.json({ message: 'Task status updated successfully' });
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof Error) return NextResponse.json(error.message);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}
