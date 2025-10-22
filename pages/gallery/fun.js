import GalleryPage from "../../components/GalleryPage";

export default function FunGallery() {
  const photos = [
    { src: "/gallery/fun1.jpg", caption: "Dugout Laughter" },
    { src: "/gallery/fun2.jpg", caption: "Hotel Pool Hangout" },
    { src: "/gallery/fun3.jpg", caption: "Bus Ride Jokes" },
  ];

  return (
    <GalleryPage
      title="Fun & Memories"
      subtitle="Because GP31 is more than baseball."
      photos={photos}
    />
  );
}
