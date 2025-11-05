export default function TryoutFlyer() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0b0b0c",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#E5E5E5", marginBottom: "20px", textAlign: "center" }}>
        GP31 Baseball Tryouts
      </h1>

      <img
        src="/images/tryout-flyer.jpg"
        alt="GP31 Tryout Flyer"
        style={{
          maxWidth: "90%",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        }}
      />

      <p style={{ color: "#B7BDC6", marginTop: "30px", textAlign: "center" }}>
        Visit the <a href="/11u" style={{ color: "#209CEE" }}>11U Team Page</a>
      </p>
    </main>
  );
}
