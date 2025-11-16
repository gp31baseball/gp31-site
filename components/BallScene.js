"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

// ========================== 3D BALL ==========================
function BaseballModel() {
  const gltf = useGLTF("/models/baseball.glb");

  const rootRef = useRef();   // vertical placement + entrance scale
  const floatRef = useRef();  // up/down float

  // responsive scale
  const [scale, setScale] = useState(1.2);
  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(2.0, Math.max(1.2, window.innerWidth / 850)));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // extract mesh
  let mesh = null;
  gltf.scene.traverse((child) => {
    if (child.isMesh && !mesh) mesh = child;
  });
  if (!mesh) return null;

  // label facing camera
  mesh.rotation.set(Math.PI / 2, -Math.PI / 2, 0);

  // entrance scale
  const entrance = useRef(0);

  useFrame((state, delta) => {
    if (!rootRef.current || !floatRef.current) return;

    // entrance animation (scale in)
    if (entrance.current < 1) {
      entrance.current = Math.min(1, entrance.current + delta * 1.2);
      const s = 0.8 + 0.2 * entrance.current;
      rootRef.current.scale.set(s, s, s);
    }

    // float up/down
    floatRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
  });

  return (
    <group ref={rootRef} position={[0, 0.05, 0]}>
      <group ref={floatRef}>
        {/* horizontal nudge to visually center logo */}
        <group position={[-0.2, 0, 0]}>
          <primitive object={mesh} scale={scale} />
        </group>
      </group>
    </group>
  );
}

// ========================== PAGE ==========================
export default function BallScene() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "radial-gradient(circle at center, #001136, #000000 85%)",
        overflow: "hidden",
        position: "relative",
        pointerEvents: "none", // Canvas won't steal clicks
      }}
    >
      {/* ========= STADIUM LIGHT FLARES / ATMOS ========= */}
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

      {/* ========= GP31 TEXAS WATERMARK (ANIMATED) ========= */}
      {/* Put your Texas GP31 watermark PNG at /public/images/gp31-texas-watermark.png */}
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

      {/* ================= HERO TEXT + TEAM SELECT ================= */}
      <div
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

        {/* UNDERLINE BAR (ANIMATED) */}
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

        {/* TEAM SELECTOR PILL BAR */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeIn 1.7s ease forwards",
          }}
        >
          {["10u", "11u", "12u", "13u", "14u", "15u"].map((team) => (
            <div
              key={team}
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
                position: "relative",
                overflow: "hidden",
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
              {/* metallic shine sweep overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "60%",
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.5), transparent)",
                  transform: "translateX(-150%)",
                  pointerEvents: "none",
                  animation: "pillShine 3.2s ease-in-out infinite",
                }}
              />
              {team.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* =================== 3D CANVAS =================== */}
      <Canvas camera={{ position: [0, 0, 1], fov: 35 }} shadows>
        {/* ambient */}
        <ambientLight intensity={0.25} />

        {/* stadium rim lights */}
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

        {/* spotlight under ball */}
        <spotLight
          position={[0, 2.5, 3]}
          angle={0.6}
          penumbra={0.8}
          intensity={1.2}
          color={"#ffffff"}
        />

        {/* shadow plane */}
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

      {/* =================== KEYFRAME STYLES =================== */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideDown {
            0% { opacity: 0; transform:translateX(-50%) translateY(-20px); }
            100% { opacity: 1; transform:translateX(-50%) translateY(0px); }
          }

          @keyframes underlineSweep {
            0%   { transform: translateX(-120%); }
            40%  { transform: translateX(120%); }
            100% { transform: translateX(120%); }
          }

          @keyframes watermarkPulse {
            0% { transform: translateX(-50%) scale(1); opacity: 0.04; }
            50% { transform: translateX(-50%) scale(1.03); opacity: 0.09; }
            100% { transform: translateX(-50%) scale(1); opacity: 0.04; }
          }

          @keyframes pillShine {
            0%   { transform: translateX(-150%); }
            50%  { transform: translateX(140%); }
            100% { transform: translateX(140%); }
          }
        `}
      </style>
    </div>
  );
}
