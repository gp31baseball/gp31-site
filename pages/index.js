import dynamic from "next/dynamic";

const BallScene = dynamic(() => import("../components/BallScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <BallScene />
    </div>
  );
}
