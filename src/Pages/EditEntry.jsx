import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import Form from "../components/Form/Form.jsx";
import AuthContext from "../context/AuthContext.jsx";
import AuthButton from "../components/Buttons/authButtons/AuthButton.jsx";
import MOTD from "../components/MOTD.jsx";
import AuthInput from "../components/Inputs/AuthInput.jsx";
import { transactionsAPI } from "../api/transactions/transactionsAPI.js";

const editEntry = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const value = useRef();
  const description = useRef();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/");
    }
  }, []);

  async function edit(e) {
    e.preventDefault();
    const body = {
      value: value.current.value,
      description: description.current.value,
    };

    setDisabled(true);

    if (type === "income") {
      try {
      await transactionsAPI.editIncome(id, body, auth);
      navigate("/home");
    } catch (err) {
        alert(`${err.response.data}`);
        setDisabled(false);
    };
    } else {
      transactionsAPI.editExpense(id, body, auth).then((res) => {
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
        <h1>Edit {type === "income" ? type : "expense"}</h1>{" "}
      </Header>
      <Form func={edit}>
        <AuthInput
          type="number"
          ref={value}
          step="0.01"
          min="0"
          name="value"
          placeholder="Amount"
          disabled={disabled}
          required
        ></AuthInput>
        <AuthInput
          type="text"
          ref={description}
          name="description"
          placeholder="Description"
          disabled={disabled}
          required
        ></AuthInput>
        <AuthButton
          action={`Save ${type === "income" ? "Income" : "Expense"}`}
          loading={"Saving..."}
          disabled={disabled}
          type="submit"
        />
        {disabled ? null : <MOTD navigate={() => navigate(-1)} text={"Cancel"} />}
      </Form>
    </Body>
  );
};

export default editEntry;

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
