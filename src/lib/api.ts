export const API_URL = 'http://localhost:4000';

export async function request(
  path: string,
  options: RequestInit = {},
  auth = false
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  } as Record<string, string>;
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  if (res.status === 204) return null;
  return res.json();
}
