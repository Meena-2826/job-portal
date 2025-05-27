import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-lg">Job Portal</Link>
      <div className="space-x-4">
        <Link href="/student">Student</Link>
        <Link href="/recruiter">Recruiter</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
