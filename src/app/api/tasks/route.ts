import { NextRequest, NextResponse } from 'next/server';
import { fetchTodos, createTodo, deleteTodo } from '@/actions/todoActions';
import { auth } from '../../../../auth';

export async function GET() {
  const session = await auth();
  try {
    const tasks = await fetchTodos(session?.user.id as string);
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
    const session = await auth();
    const { task } = await req.json();
    const userId = session?.user.id as string;
    if (!task) {
      return NextResponse.json({ error: 'task is required' }, { status: 400 });
    }
    await createTodo(task, userId);
    return NextResponse.json(
      { message: 'Task created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json(error.message);
    return NextResponse.json({
      status: 500,
      message: error,
    });
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

    await deleteTodo(taskId);

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting task ${error}` },
      { status: 500 }
    );
  }
}
