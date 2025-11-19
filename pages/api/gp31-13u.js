import games from "../../data/gp31-13u.json";

export default function handler(req, res) {
  const sorted = [...games].sort(
    (a, b) => new Date(b?.date ?? 0) - new Date(a?.date ?? 0)
  );

  res.status(200).json({ games: sorted });
}

