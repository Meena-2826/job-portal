import { NextRequest, NextResponse } from 'next/server';

let completions: any[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { taskId, user } = body;

  const existing = completions.find((c) => c.taskId === taskId && c.user === user);

  if (existing) {
    return NextResponse.json({ message: "Task already completed!" }, { status: 400 });
  }

  completions.push({ taskId, user });
  return NextResponse.json({ message: "Task marked as completed!" });
}

export async function GET() {
  return NextResponse.json(completions);
}
