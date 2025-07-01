import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh token');

  if (!refreshToken) return null;

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh: refreshToken
    },
    {
      headers: {
        "Content-Type": "application/json"
      }    
    });
  
    const newAccessToken = res.data.access;
    localStorage.setItem("access token", newAccessToken);
    return newAccessToken;

  } catch(error) {
    localStorage.clear();
    return null;
  }
}