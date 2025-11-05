import fs from "fs";
import path from "path";
import { useState } from "react";

// ----- Server Side -----
export async function getServerSideProps() {
  const dir = path.join(process.cwd(), "data", "submissions");
  let submissions = [];

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    submissions = files
      .map((f) => {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f)));
        return data;
      })
      .sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
  }

  return { props: { submissions } };
}

// ----- Client Side -----
export default function LogsPage({ submissions }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(submissions);

  // Check password
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Olivia") {
      setAuthorized(true);
    } else {
      alert("Incorrect password. Try again.");
    }
  };

  if (!authorized) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A1A3F] text-white">
        <h1 className="text-3xl font-bold text-[#FFD700] mb-6">
          Coach Access Only
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center bg-[#10224F] p-6 rounded-lg shadow-lg border border-[#FFD700]/40"
        >
          <label className="mb-2 text-gray-300">Enter Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md bg-[#0A1A3F] border border-[#FFD700]/40 text-white mb-4 focus:ring-2 focus:ring-[#FFD700]"
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-[#FFD700] text-[#0B0B0C] font-semibold hover:bg-[#FFF580] transition"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  // ---------- Dashboard ----------
  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      const diff =
        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      return sortOrder === "asc" ? diff : -diff;
    });
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (value) => {
    setFilter(value);
    const filtered = submissions.filter((s) =>
      `${s.name} ${s.position} ${s.age}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const handleDownload = () => {
    const csvHeader = "Date,Name,Email,Phone,Age,Position,Message\n";
    const csvRows = data.map((s) =>
      [
        new Date(s.submittedAt).toLocaleString(),
        s.name,
        s.email,
        s.phone,
        s.age,
        s.position,
        `"${s.message.replace(/"/g, "'")}"`,
      ].join(",")
    );
    const blob = new Blob([csvHeader + csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gp31_submissions.csv";
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#0A1A3F] text-white p-6">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-6 text-center">
        GP31 Contact Submissions
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by name, position, or age..."
          value={filter}
          onChange={(e) => handleFilter(e.target.value)}
          className="p-2 rounded-md bg-[#10224F] border border-[#FFD700]/40 text-white w-72 focus:ring-2 focus:ring-[#FFD700]"
        />
        <button
          onClick={handleSort}
          className="px-4 py-2 rounded-md bg-[#FFD700] text-[#0B0B0C] font-semibold hover:bg-[#FFF580] transition"
        >
          Sort {sortOrder === "asc" ? "▲ Oldest" : "▼ Newest"}
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-md bg-[#FFD700] text-[#0B0B0C] font-semibold hover:bg-[#FFF580] transition"
        >
          ⬇ Download CSV
        </button>
      </div>

      {/* Submissions */}
      {data.length === 0 && (
        <p className="text-center text-gray-300">No submissions yet.</p>
      )}

      <div className="grid gap-4 max-w-4xl mx-auto">
        {data.map((s, i) => (
          <div
            key={i}
            className="border border-[#FFD700]/40 rounded-lg p-4 bg-[#10224F]/70 hover:bg-[#142B5C] transition"
          >
            <p>
              <strong>Name:</strong> {s.name}
            </p>
            <p>
              <strong>Email:</strong> {s.email}
            </p>
            <p>
              <strong>Phone:</strong> {s.phone}
            </p>
            <p>
              <strong>Age:</strong> {s.age}
            </p>
            <p>
              <strong>Position:</strong> {s.position}
            </p>
            <p>
              <strong>Message:</strong> {s.message}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Submitted: {new Date(s.submittedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
