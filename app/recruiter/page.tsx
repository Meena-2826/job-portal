'use client';

export default function RecruiterDashboard() {
  const addTask = async () => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now(),
        title: "Example Task",
        description: "Complete this task to earn points",
        points: 10,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.message || 'Task added!');
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📢 Recruiter Dashboard</h1>
      <button
        onClick={addTask}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Task
      </button>
    </main>
  );
}
