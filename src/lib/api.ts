// Tiny fetch helper for talking to FastAPI. That's the whole "API layer".
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}
