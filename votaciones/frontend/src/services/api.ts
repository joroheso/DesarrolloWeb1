export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Sesión expirada");
  }
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "Error de API");
  }
  return res.json();
}