import fs from "fs";
import path from "path";

export async function getServerSideProps() {
  const dir = path.join(process.cwd(), "data", "submissions");
  let submissions = [];

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    submissions = files
      .map(f => {
        const fileData = JSON.parse(fs.readFileSync(path.join(dir, f)));
        return fileData;
      })
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }

  return { props: { submissions } };
}

export default function LogsPage({ submissions }) {
  return (
    <main className="min-h-screen bg-[#0A1A3F] text-white p-8">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
        GP31 Contact Submissions
      </h1>

      {submissions.length === 0 && (
        <p className="text-gray-300">No submissions yet.</p>
      )}

      <div className="space-y-4">
        {submissions.map((s, i) => (
          <div
            key={i}
            className="border border-[#D4AF37]/40 rounded-lg p-4 bg-[#10224F]/80"
          >
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Phone:</strong> {s.phone}</p>
            <p><strong>Age:</strong> {s.age}</p>
            <p><strong>Position:</strong> {s.position}</p>
            <p><strong>Message:</strong> {s.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              Submitted: {new Date(s.submittedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
