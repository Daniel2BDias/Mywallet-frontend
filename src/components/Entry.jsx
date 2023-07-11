import styled from "styled-components";
import { CgTrash } from "react-icons/cg";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import axios from "axios";

const Entry = ({ date, title, value, type }) => {
  const { auth } = useContext(AuthContext);

  const token = auth?.token;

  async function deleteEntry(token, date, title, value, type) {
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
      const promise = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-entry`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(promise.status === 200) window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function editEntry(token, date, title, value, type) {

  };

  return (
    <Body type={type}>
      <div className="info">
        <span>{date}</span><div className="description" data-test="registry-name" onClick={() => (editEntry(token, date, title, value, type))}>{title}</div>
      </div>
      <p className="balance" data-test="registry-amount">{value.toString().replace(".", ",")}</p>
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
  max-width: 326px;
  margin: 10px 5px;

  .balance {
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
    margin-right: 10px;
  }

  .description {
    width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .info {
    display: flex;
  }

  .trash {
    margin: 0;
    margin-left: 5px;
    padding: 0;
    font-size: 20px !important;
  }

  .trash:hover {
    cursor: pointer;
  }
`;
