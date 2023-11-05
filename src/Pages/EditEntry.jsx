import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

const editEntry = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState({});

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/");
    }
  }, []);

  function edit(e) {
    e.preventDefault();

    if (type === "entrada") {
      const promise = axios.put(
        `${import.meta.env.VITE_API_URL}/edit-entry/add/${id}`,
        body,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      promise.then((res) => {
        navigate("/home");
      });
      promise.catch((err) => alert(`${err.response.data}`));
    } else {
      const promise = axios.put(
        `${import.meta.env.VITE_API_URL}/edit-entry/subtract/${id}`,
        body,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      promise.then((res) => {
        navigate("/home");
      });
      promise.catch((err) => alert(`${err.response.data}`));
    }
  }

  return (
    <Body>
      <Header>
        <h1>Editar {type === "entrada" ? "entrada" : "saída"}</h1>{" "}
      </Header>
      <Form onSubmit={edit}>
        <input
          type="number"
          step="0.01"
          min="0"
          name="value"
          placeholder="Valor"
          value={value}
          onChange={(e) => {
            setBody({ ...body, [e.target.name]: e.target.value });
            setValue(e.target.value);
          }}
          required
        ></input>
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(e) => {
            setBody({ ...body, [e.target.name]: e.target.value });
            setDescription(e.target.value);
          }}
          required
        ></input>
        <button type="submit">
          Salvar {type === "entrada" ? "entrada" : "saída"}
        </button>
        <p onClick={() => navigate(-1)}>Cancelar</p>
      </Form>
    </Body>
  );
};

export default editEntry;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    margin: 7px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
  }

  button {
    width: 330px;
    height: 58px;
    border-radius: 5px;
    margin: 7px;
    border: none;
    color: white;
    background-color: #a328d6;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    transform: scale(0.97);
  }

  p {
    color: white;
    cursor: pointer;
  }
`;

const Header = styled.div`
  height: 70px;
  width: 326px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 26px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
