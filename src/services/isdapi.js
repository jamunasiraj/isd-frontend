const API_BASE_URL = "http://localhost:8080/api";

/**
 * Generic API helper
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage (or wherever you store it)
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // ignore JSON parse errors
      }
      throw new Error(errorMessage);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

/**
 * Auth: Register new user
 */
export const registerUser = async (userData) => {
  return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};
