import styled from "styled-components";
import { CgTrashEmpty } from "react-icons/cg";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { transactionsAPI } from "../../api/transactions/transactionsAPI.js";

const Entry = ({ id, date, title, value, type }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = auth?.token;

  async function deleteEntry(token, id) {
    const confirmation = window.confirm("Would you like to delete this entry?");

    if (!confirmation) return;

    try {
      const promise = await transactionsAPI.deleteEntry(id, token);
      if (promise.status === 204) window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Body
      type={type}
      onClick={(e) => {
        e.stopPropagation();
        const confirm = window.confirm("Would like to edit this entry?");
        if (!confirm) return;
        navigate(`/edit/${type === "add" ? "income" : "expense"}/${id}`)
      }}
    >
      <div className="info">
        <span>{date}</span>
        <div className="description">
          {title}
        </div>
      </div>
      <p className="balance">
        {value.toString().replace(".", ",")}
      </p>
      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          deleteEntry(token, id);
        }}
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
  width: 96.5%;
  max-width: 326px;
  margin: 10px 5px;

  @media (max-width: 280px) {
    max-width: 224px;
  }

  .balance {
    color: ${(props) => (props.type === "add" ? "#03AC00" : "#C70000")};
    width: 100%;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    width: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .info {
    display: flex;
  }
`;

const DeleteIcon = styled(CgTrashEmpty)`
margin: 0;
margin-left: 5px;
padding: 0;
font-size: 20px !important;
min-width: 20px;

&:hover {
  cursor: pointer;
}
`