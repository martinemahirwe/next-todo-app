import { NextRequest, NextResponse } from 'next/server';
import { ParamType } from '@/types/todoType';
import { updateTodo } from '@/actions/todoActions';

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

    await updateTodo(taskId, type, { description, completed });

    if (type === 'description') {
      return NextResponse.json({
        message: 'Task description updated successfully',
      });
    }
    if (type === 'status') {
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
