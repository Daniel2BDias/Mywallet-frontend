import styled from "styled-components";
import { CgTrash } from "react-icons/cg";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Entry = ({ date, title, value, type }) => {
  const { auth } = useContext(AuthContext);

  const token = auth?.token;

  async function deleteEntry(token, date, title, value, type, setEntrys) {
    const confirmation = window.confirm("Deseja deletar esta entrada?");

    if(!confirmation) return;

    const body = {
      transaction: {
        value: value,
        description: title,
        type: type,
        date: date,
      },
    };
  
    try {
      await axios.post(`${process.env.REACT_APP_API_URI}/delete-entry`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const transactions = await axios.get(
          `${process.env.REACT_APP_API_URI}/transactions`,
          { headers: { authorization: `Bearer ${token}` } }
        );
  
        setEntrys(transactions);
    } catch (error) {
      alert(error.response.statusText + "  Error: " + error.response.status);
    }
  }

  return (
    <Body type={type}>
      <p>
        <span>{date}</span><span data-test="registry-name">{title}</span>
      </p>
      <p data-test="registry-amount">$ {value}</p>
      <CgTrash
        data-test="registry-delete"
        className="trash"
        onClick={() => deleteEntry(token, date, title, value, type)}
      />
    </Body>
  );
};

export default Entry;

const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 90%;
  margin: 10px 5px;

  p:nth-child(2) {
    color: ${(props) => (props.type === "add" ? "#03AC00" : "#C70000")};
  }

  p,
  span {
    background-color: white;
    margin: 0;
    padding: 0;
  }

  span:first-child {
    color: #c6c6c6;
    font-size: 16px;
  }

  .trash {
    margin: 0;
    padding: 0;
  }

  .trash:hover {
    cursor: pointer;
  }
`;
