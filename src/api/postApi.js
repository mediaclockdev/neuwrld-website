import { BASE_URL } from "./apiList";

export async function postApi(endpoint, body = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();

    try {
      const json = JSON.parse(text);
      throw new Error(json.message || "Request failed");
    } catch {
      throw new Error("Server error");
    }
  }

  return res.json();
}
