export default function Leaderboard() {
  const users = [
    { name: "Alice", points: 80 },
    { name: "Bob", points: 60 },
    { name: "Charlie", points: 40 },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>
      <ol className="list-decimal pl-6 space-y-2">
        {users.sort((a, b) => b.points - a.points).map((user, i) => (
          <li key={i}>
            {user.name} — {user.points} pts
          </li>
        ))}
      </ol>
    </main>
  );
}
