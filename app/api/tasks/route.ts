// app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const tasksFile = path.join(process.cwd(), "tasks.json");

// Load tasks from file
function loadTasks() {
  if (fs.existsSync(tasksFile)) {
    const json = fs.readFileSync(tasksFile, "utf-8");
    return JSON.parse(json);
  }
  return [];
}

// Save tasks to file
function saveTasks(tasks: any[]) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

export async function GET() {
  const tasks = loadTasks();
  console.log("Returning tasks:", tasks);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { title, description, points } = await req.json();

  if (!title || !description || !points) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    points,
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return NextResponse.json({ message: "Task added", task: newTask }, { status: 201 });
}
