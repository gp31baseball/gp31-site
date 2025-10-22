import GalleryPage from "../../components/GalleryPage";

export default function GoldCup() {
  const photos = [
    { src: "/gallery/goldcup1.jpg", caption: "PGBA Gold Cup – Game 1" },
    { src: "/gallery/goldcup2.jpg", caption: "Championship Celebration" },
    { src: "/gallery/goldcup3.jpg", caption: "Postgame Huddle" },
    { src: "/gallery/goldcup4.jpg", caption: "" },	
    { src: "/gallery/goldcup5.jpg", caption: "" },
    { src: "/gallery/goldcup6.jpg", caption: "" },
    { src: "/gallery/goldcup7.jpg", caption: "" },
    { src: "/gallery/goldcup8.jpg", caption: "" },
    { src: "/gallery/goldcup9.jpg", caption: "" },
  ];

  return (
    <GalleryPage
      title="PGBA Gold Cup Classic"
      subtitle="Houston, TX – 2025 Champions"
      photos={photos}
    />
  );
}
