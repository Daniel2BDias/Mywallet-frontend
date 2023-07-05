import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState({});
  const { auth, loginAuth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, []);

  function login(e) {
    e.preventDefault();
    const promise = axios.post(`${process.env.REACT_APP_API_URI}/login`, body);
    promise.then((res) => {
      loginAuth(res.data);
      setAuth(res.data);
      navigate("/home");
    });
    promise.catch((err) => {
      alert(`${err.response.data}`);
    });
  }

  const navigate = useNavigate();

  return (
    <LoginPage>
      <h1>MyWallet</h1>
      <Form onSubmit={login}>
        <input
          data-test="email"
          type="email"
          name="email"
          placeholder="E-Mail"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setBody({ ...body, [e.target.name]: e.target.value });
          }}
          required
        ></input>
        <input
          data-test="password"
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setBody({ ...body, [e.target.name]: e.target.value });
          }}
          required
        ></input>
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </Form>
      <p onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se!</p>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center:
    align-items: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        height: 20vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 32px;
        color: white;
        margin-bottom: 10px;
    }

    p {
        color: white;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p:hover {
        cursor: pointer;
    }

    button {
        height: 50px;
        width: 326px;
        background-color: #A328D6;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
    }

    button:hover {
        cursor: pointer;
    }

    button:active {
        transform: scale(0.95);
    }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    width: 326px;
    height: 50px;
    font-size: 20px;
    box-sizing: border-box;
  }

  input::placeholder {
    color: #000000;
    font-size: 20px;
  }
`;
