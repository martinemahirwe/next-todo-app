import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import database from '@/db/drizzle';
import { todolist } from '@/db/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');

  if (!userEmail) {
    return NextResponse.json(
      { error: 'userEmail is required' },
      { status: 400 }
    );
  }

  try {
    const tasks = await database
      .select()
      .from(todolist)
      .where(eq(todolist.userEmail, userEmail));
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching tasks ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { task, userEmail } = await req.json();

    if (!task || !userEmail) {
      return NextResponse.json(
        { error: 'task, and userEmail are required' },
        { status: 400 }
      );
    }

    const newTodo = {
      task,
      userEmail,
    };

    await database.insert(todolist).values(newTodo);
    return NextResponse.json(
      { message: 'Task created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json(error.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId is required' },
        { status: 400 }
      );
    }

    await database.delete(todolist).where(eq(todolist.id, taskId));

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting task ${error}` },
      { status: 500 }
    );
  }
}
