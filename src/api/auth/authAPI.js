import axios from "axios";

function login(body) {
  return axios.post(`${import.meta.env.VITE_API_URL}/login`, body);
}

async function logout(auth, setAuth, navigate) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/logout/`, {
      headers: { authorization: `Bearer ${auth?.token}` },
    })
    .then(() => {
      navigate("/");
      setAuth(null);
      localStorage.setItem("auth", null);
    })
    .catch((err) => {
      alert("Could not finish your session. Try again, please.");
      console.error(err);
    });
}

function signUp(body) {
  return axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, body);
}

export const authAPI = { login, logout, signUp };
