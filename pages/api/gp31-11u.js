import games from "../../data/gp31-11u.json";


export default function handler(req, res) {
  const sorted = [...games].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  res.status(200).json({ games: sorted });
}

