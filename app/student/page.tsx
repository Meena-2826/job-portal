'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  deadline?: string;
  attachment?: string;
}

export default function StudentDashboard() {
  const { data: session } = useSession();
  const { width, height } = useWindowSize();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!session) return;

    fetch("/api/complete")
      .then(res => res.json())
      .then(data => {
        const userEmail = session.user?.email;
        const userCompletions = data.filter((c: any) => c.user === userEmail);
        setCompleted(userCompletions.map((c: any) => c.taskId));

        const earnedPoints = userCompletions.reduce((total: number, c: any) => {
          const task = tasks.find(t => t.id === c.taskId);
          return total + (task?.points || 0);
        }, 0);

        setPoints(earnedPoints);
      })
      .catch(console.error);
  }, [session, tasks]);

  const completeTask = async (id: number) => {
    const res = await fetch("/api/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: id, user: session?.user?.email }),
    });

    if (res.ok) {
      setCompleted(prev => [...prev, id]);
      const task = tasks.find(t => t.id === id);
      const earned = task?.points || 0;
      const newPoints = points + earned;
      setPoints(newPoints);

      if ((points < 50 && newPoints >= 50) || (points < 100 && newPoints >= 100)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  };

  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const progress = totalPoints ? Math.floor((points / totalPoints) * 100) : 0;

  const getBadge = () => {
    if (points >= 100) return "🏆 Master";
    if (points >= 50) return "🥈 Intermediate";
    return "📗 Beginner";
  };

  return (
    <main className="p-6">
      {showConfetti && <Confetti width={width} height={height} />}
      <h1 className="text-3xl font-bold mb-2">🎓 Student Dashboard</h1>
      <p className="mb-1">Your Points: <strong>{points}</strong></p>
      <p className="mb-1">Progress: {progress}%</p>
      <p className="mb-4">🏅 Badge: {getBadge()}</p>

      <h2 className="text-2xl font-semibold mb-4">📋 Available Tasks</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.li
              key={task.id}
              className="border p-4 rounded shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h4 className="text-lg font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <p>🪙 {task.points} Points</p>
              {task.deadline && <p className="text-sm text-gray-500">⏰ Deadline: {task.deadline}</p>}
              {task.attachment && (
                <p>
                  📎 <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download Attachment</a>
                </p>
              )}
              <button
                onClick={() => completeTask(task.id)}
                disabled={completed.includes(task.id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
              >
                {completed.includes(task.id) ? "✅ Completed" : "Complete Task"}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </main>
  );
}
