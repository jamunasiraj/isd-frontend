const API_BASE_URL = "http://localhost:8080/api";

/**
 * Generic API helper
 * Exported so it can be reused in ticketService, auditService, adminService, etc.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to extract backend error message
      let errorMessage = `Error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      throw new Error(errorMessage);
    }

    // Handle empty responses (204 No Content)
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
