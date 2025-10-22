import GalleryPage from "../../components/GalleryPage";

export default function TeamPhotos() {
  const photos = [
    { src: "/gallery/team1.jpg", caption: "Team Photo 2025" },
    { src: "/gallery/team2.jpg", caption: "Uniforms & Swag" },
    { src: "/gallery/team3.jpg", caption: "Pre-Game Warmups" },
  ];

  return (
    <GalleryPage
      title="Team Photos"
      subtitle="Proudly representing GP31 Baseball"
      photos={photos}
    />
  );
}
