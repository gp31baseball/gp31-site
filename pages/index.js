import Link from "next/link";

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
      {/* Branded Header */}
      <h1
        style={{
          color: "#FFD700",
          textShadow: "0 0 15px rgba(255, 215, 0, 0.4)",
          marginBottom: "25px",
          textAlign: "center",
          fontSize: "2.4rem",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        GP31 2026 Spring Baseball Tryouts
      </h1>

      {/* Clickable Flyer */}
      <Link href="/contact" passHref>
        <img
          src="/images/tryout-flyer.jpg"
          alt="GP31 Tryout Flyer"
          style={{
            maxWidth: "90%",
            height: "auto",
            borderRadius: "14px",
            boxShadow: "0 0 25px rgba(255, 215, 0, 0.25)",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 0 40px rgba(255, 215, 0, 0.45)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(255, 215, 0, 0.25)";
          }}
        />
      </Link>

      {/* Stronger CTA for 11U Page */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Link
          href="/11u"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #FFD700, #E6C200)",
            color: "#0B0B0C",
            fontWeight: "700",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
            textDecoration: "none",
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(255, 215, 0, 0.6)";
            e.currentTarget.style.background =
              "linear-gradient(90deg, #FFF580, #FFD700)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(255, 215, 0, 0.4)";
            e.currentTarget.style.background =
              "linear-gradient(90deg, #FFD700, #E6C200)";
          }}
        >
          ⚾ Visit the 11U Team Page
        </Link>
            </div>
    </main>
  );
}

