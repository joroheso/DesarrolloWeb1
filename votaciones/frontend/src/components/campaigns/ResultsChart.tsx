export default function ResultsChart({ data }: { data: Record<string, number> }) {
  const total = Object.values(data || {}).reduce((a, b) => a + b, 0) || 1;
  return (
    <div>
      {Object.entries(data || {}).map(([name, count]) => (
        <div key={name} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{name}</strong>
            <span>{count}</span>
          </div>
          <div style={{ background: "#eee", height: 8, borderRadius: 4 }}>
            <div style={{ width: `${(count / total) * 100}%`, background: "#0056b3", height: 8, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}