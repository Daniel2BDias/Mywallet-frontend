import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { transactionsAPI } from "../api/transactions/transactionsAPI.js";
import AuthButton from "../components/Buttons/authButtons/AuthButton.jsx";
import AuthInput from "../components/Inputs/AuthInput.jsx";
import MOTD from "../components/MOTD.jsx";

const Transaction = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const value = useRef();
  const description = useRef();

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/");
    }
  }, []);

  function salvar(e) {
    e.preventDefault();

    const body = {
      value: value.current.value,
      description: description.current.value,
    };

    setDisabled(true);

    if (type === "income") {
      transactionsAPI
        .postIncome(auth?.token, body)
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          alert(`${err.response.data}`);
          setDisabled(false);
        });
    } else {
      transactionsAPI
        .postExpense(auth?.token, body)
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          alert(`${err.response.data}`);
          setDisabled(false);
        });
    }
  }

  return (
    <Body>
      <Header>
        <h1>New {type === "income" ? type : "expense"}</h1>
      </Header>
      <Form onSubmit={salvar}>
        <AuthInput
          type="number"
          ref={value}
          disabled={disabled}
          step="0.01"
          min="0"
          name="value"
          placeholder="Amount"
          required
        ></AuthInput>
        <AuthInput
          type="text"
          ref={description}
          disabled={disabled}
          name="description"
          placeholder="Description"
          required
        ></AuthInput>
        <AuthButton
          disabled={disabled}
          action={`Save ${type === "income" ? "Income" : "Expense"}`}
          loading={"Saving..."}
          type="submit"
        />
        {disabled ? null : <MOTD navigate={() => navigate(-1)} text={"Cancel"}/>}
      </Form>
    </Body>
  );
};

export default Transaction;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

  @media (max-width: 280px) {
    width: 96%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
