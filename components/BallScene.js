"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

/* ===========================================================
   FLOATING BASEBALL MODEL
=========================================================== */
function BaseballModel() {
  const gltf = useGLTF("/models/baseball.glb");

  const rootRef = useRef();
  const floatRef = useRef();

  // responsive scale
  const [scale, setScale] = useState(1.2);
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 550) setScale(1.1);
      else if (window.innerWidth < 768) setScale(1.3);
      else setScale(Math.min(2.0, window.innerWidth / 850));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // extract mesh
  let mesh = null;
  gltf.scene.traverse((c) => {
    if (c.isMesh && !mesh) mesh = c;
  });
  if (!mesh) return null;

  // label orientation
  mesh.rotation.set(Math.PI / 2, -Math.PI / 2, 0);

  // FLOAT ONLY
  useFrame((state) => {
    if (floatRef.current) {
      floatRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
    }
  });

  return (
    <group ref={rootRef} className="ball-root" position={[0, 0.05, 0]}>
      <group ref={floatRef}>
        <group className="ball-inner" position={[-0.2, 0, 0]}>
          <primitive object={mesh} scale={scale} />
        </group>
      </group>
    </group>
  );
}

/* ===========================================================
   MAIN LANDING PAGE SCENE
=========================================================== */
export default function BallScene() {
  const teams = ["10u", "11u", "12u", "13u", "14u", "15u"];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "radial-gradient(circle at center, #001136, #000000 85%)",
        overflow: "hidden",
        position: "relative",
        pointerEvents: "none",
      }}
    >
      {/* ====== STADIUM ATMOSPHERE OVERLAYS ====== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(212,160,24,0.18), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 85% 0%, rgba(0,17,54,0.6), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ====== TEXAS WATERMARK ====== */}
      <img
        src="/images/gp31-texas-watermark.png"
        alt=""
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "420px",
          opacity: 0.08,
          filter: "drop-shadow(0 0 16px rgba(212,160,24,0.7))",
          pointerEvents: "none",
          zIndex: 1,
          animation: "watermarkPulse 8s ease-in-out infinite",
        }}
      />

      {/* ===========================================================
         HERO BLOCK (TITLE + PILLS + SCOREBOARD BADGE)
      ============================================================ */}
      <div
        className="hero"
        style={{
          position: "absolute",
          top: "7%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          animation: "slideDown 1.2s ease forwards",
          zIndex: 20,
          pointerEvents: "auto",
        }}
      >
        {/* TITLE */}
        <h1
          className="hero-title"
          style={{
            color: "#ffffff",
            fontSize: "4.6rem",
            fontWeight: "900",
            letterSpacing: "0.18em",
            textShadow:
              "0 0 28px rgba(255,215,0,0.45), 0 0 18px rgba(0,0,0,0.8)",
            marginBottom: "0.35rem",
            fontFamily: '"Anton", sans-serif',
            textTransform: "uppercase",
          }}
        >
          GP31{" "}
          <span
            style={{
              color: "#d4a018",
              textShadow: "0 0 22px rgba(212,160,24,0.85)",
            }}
          >
            Baseball
          </span>
        </h1>

        {/* UNDERLINE BAR */}
        <div
          style={{
            width: "260px",
            height: "6px",
            background: "linear-gradient(90deg, #d4a018, #ffffff, #d4a018)",
            borderRadius: "4px",
            margin: "0 auto 1.2rem auto",
            boxShadow: "0 0 22px rgba(212,160,24,0.65)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
              transform: "translateX(-100%)",
              animation: "underlineSweep 2.4s ease-in-out infinite",
            }}
          />
        </div>

        {/* SUBTITLE */}
        <p
          className="hero-sub"
          style={{
            color: "#d4a018",
            fontSize: "1.25rem",
            fontWeight: "600",
            letterSpacing: "0.35em",
            textShadow: "0px 0px 15px rgba(212, 160, 24, 0.45)",
            marginBottom: "2rem",
            fontFamily: "sans-serif",
          }}
        >
          SELECT TEAMS • EST. 2024
        </p>

        {/* TEAM SELECTOR PILLS */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeIn 1.7s ease forwards",
            maxWidth: "95vw",
            marginBottom: "1.4rem",
          }}
        >
          {teams.map((team) => (
            <div
              key={team}
              className="team-pill"
              onClick={() => (window.location.href = `/${team}`)}
              style={{
                padding: "0.65rem 1.4rem",
                background:
                  "linear-gradient(180deg, #f9d974 0%, #d4a018 100%)",
                color: "#001136",
                fontWeight: "800",
                letterSpacing: "0.12em",
                borderRadius: "999px",
                cursor: "pointer",
                border: "2px solid white",
                fontSize: "1rem",
                fontFamily: '"Anton", sans-serif',
                boxShadow:
                  "0 0 18px rgba(212,160,24,0.45), inset 0 0 9px rgba(0,0,0,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(212,160,24,0.9), inset 0 0 11px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(212,160,24,0.45), inset 0 0 9px rgba(0,0,0,0.3)";
              }}
            >
              {team.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ⭐ NEW 11U SCOREBOARD BADGE */}
        <p
          onClick={() => (window.location.href = "/scoreboard")}
          style={{
            display: "inline-block",
            padding: "0.55rem 1.2rem",
            background: "rgba(212,160,24,0.15)",
            border: "1px solid rgba(212,160,24,0.45)",
            borderRadius: "999px",
            color: "#d4a018",
            fontWeight: "700",
            letterSpacing: "0.12em",
            cursor: "pointer",
            fontSize: "0.95rem",
            textShadow: "0 0 12px rgba(212,160,24,0.45)",
            boxShadow:
              "0 0 14px rgba(212,160,24,0.3), inset 0 0 6px rgba(0,0,0,0.3)",
            transition: "all 0.25s ease",
            marginTop: "0.3rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 0 22px rgba(212,160,24,0.75), inset 0 0 8px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 0 14px rgba(212,160,24,0.3), inset 0 0 6px rgba(0,0,0,0.3)";
          }}
        >
          ⭐ NEW: 11U Scoreboard Live Now →
        </p>
      </div>

      {/* =================== 3D CANVAS =================== */}
      <Canvas camera={{ position: [0, 0, 1], fov: 35 }}>
        <ambientLight intensity={0.25} />

        <directionalLight
          position={[-5, 4, 6]}
          intensity={1.7}
          color={"#001b5e"}
        />
        <directionalLight
          position={[5, -3, 5]}
          intensity={1.7}
          color={"#d4a018"}
        />

        <spotLight
          position={[0, 2.5, 3]}
          angle={0.6}
          penumbra={0.8}
          intensity={1.2}
          color={"#ffffff"}
        />

        <mesh
          receiveShadow
          position={[0, -1.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[6, 6]} />
          <shadowMaterial opacity={0.45} />
        </mesh>

        <BaseballModel />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* =================== KEYFRAME ANIMATIONS =================== */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity:0; }
            100% { opacity:1; }
          }

          @keyframes slideDown {
            0% { opacity:0; transform:translateX(-50%) translateY(-20px); }
            100% { opacity:1; transform:translateX(-50%) translateY(0); }
          }

          @keyframes underlineSweep {
            0% { transform:translateX(-120%); }
            40% { transform:translateX(120%); }
            100% { transform:translateX(120%); }
          }

          @keyframes watermarkPulse {
            0% { transform:translateX(-50%) scale(1); opacity:0.04; }
            50% { transform:translateX(-50%) scale(1.03); opacity:0.09; }
            100% { transform:translateX(-50%) scale(1); opacity:0.04; }
          }

          @media (max-width: 768px) {
            .hero { top: 12% !important; }
            .hero-title { font-size: 2.8rem !important; }
            .hero-sub { font-size: 1rem !important; }
          }
        `}
      </style>
    </div>
  );
}
