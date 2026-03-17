export default function Footer() {
  return (
    <footer style={{
      background: "#050810",
      borderTop: "1px solid rgba(34,211,238,0.06)",
      padding: "16px 0",
    }}>
      <div style={{
        width: "var(--cWidth)", maxWidth: "var(--cMaxWidth)",
        margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{ fontSize: 11, color: "#6b6475", letterSpacing: "2px", textTransform: "uppercase" }}>
          Built by Matin Gathani
        </p>
      </div>
    </footer>
  );
}
