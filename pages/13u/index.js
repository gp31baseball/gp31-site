export default function Team13UPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0b0b0c",
        color: "#E5E5E5",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        GP31 Baseball — 
      </h1>
      <p style={{ color: "#B7BDC6", maxWidth: "700px" }}>
        This page will showcase the  roster, stats, and schedule once it’s ready.
      </p>
      <p style={{ marginTop: "30px" }}>
        <a href="/" style={{ color: "#209CEE" }}>← Back to Tryout Flyer</a>
      </p>
    </main>
  );
}

