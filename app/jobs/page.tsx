const jobs = [
  { title: "Frontend Developer", company: "Google", link: "#" },
  { title: "Backend Intern", company: "Amazon", link: "#" },
];

export default function JobsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">📄 Available Jobs</h1>
      <ul className="space-y-4">
        {jobs.map((job, i) => (
          <li key={i} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-700">{job.company}</p>
            <a href={job.link} className="text-blue-500 underline mt-1 inline-block">Apply</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
