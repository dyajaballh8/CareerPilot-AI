const API_BASE_URL = (window.CAREERPILOT_API_URL || "http://127.0.0.1:8001/api").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export const authApi = {
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(payload) })
};

export const coursesApi = {
  search: (params = "") => apiRequest(`/courses/search${params ? `?${params}` : ""}`),
  save: (courseId) => apiRequest(`/courses/${courseId}/save`, { method: "POST" }),
  unsave: (courseId) => apiRequest(`/courses/${courseId}/save`, { method: "DELETE" })
};

export const resumesApi = {
  upload: (formData) => fetch(`${API_BASE_URL}/resumes/upload`, { method: "POST", body: formData }).then((response) => response.json()),
  remove: (resumeId) => apiRequest(`/resumes/${resumeId}`, { method: "DELETE" })
};
