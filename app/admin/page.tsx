"use client";

export default function AdminDashboard() {
  const users = [
    { name: "Student A", email: "studenta@gmail.com", points: 30, role: "student" },
    { name: "Recruiter B", email: "recruiterb@gmail.com", role: "recruiter" },
    { name: "Admin", email: "admin@gmail.com", role: "admin" },
  ];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">👑 Admin Dashboard</h1>

      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{u.points || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
