export default function OgImageCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#020617",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glows */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(34,211,238,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0) 70%)",
        }}
      />

      {/* Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#22d3ee",
          }}
        />
        <div
          style={{
            color: "#67e8f9",
            fontSize: 26,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Frontend Developer &amp; 3D UI Designer
        </div>
      </div>

      {/* Name + tagline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#f8fafc", fontSize: 84, lineHeight: 1.05 }}>
          Uddish Lakhwara
        </div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 34,
            marginTop: 18,
            maxWidth: 920,
          }}
        >
          Building interactive 3D digital experiences with depth &amp; motion.
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#22d3ee",
          fontSize: 28,
          letterSpacing: "0.12em",
        }}
      >
        <div
          style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#22d3ee",
          }}
        />
        www.uddish.online
      </div>
    </div>
  );
}
