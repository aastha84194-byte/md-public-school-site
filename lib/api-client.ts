const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body: any = null,
  token: string | null = null
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    delete headers["Content-Type"];
    config.body = body;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401 || response.status === 403) {
    // Handle unauthorized/session expired
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login handled by hooks/middleware
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "An error occurred" }));
    throw new Error(errorData.detail || "Something went wrong");
  }

  return response.json();
}
