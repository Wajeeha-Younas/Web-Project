const API_BASE_URL = "http://localhost:5000/api";

  export const apiRequest = async (endpoint, method = "GET", body = null) => {

    const options = { method };
  
    if (body instanceof FormData) {
      options.body = body;
    } else if (body) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(body);
    }
  
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  
    return data;
  };