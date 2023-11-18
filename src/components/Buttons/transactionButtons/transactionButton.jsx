import { CgAdd, CgRemove } from "react-icons/cg";
import styled from "styled-components";

export default function TransactionButton({ navigate, type }) {
  function action() {
    if (type === "income") {
      navigate("/new-transaction/income");
    } else {
      navigate("/new-transaction/expense");
    }
  }

  return (
    <StyledTransactionButton onClick={action}>
      {type === "income" ? (
        <>
          <AddIcon />
          <p>
            New
            <br />
            Income
          </p>
        </>
      ) : (
        <>
          <SubtractIcon />
          <p>
            New <br />
            Expense
          </p>
        </>
      )}
    </StyledTransactionButton>
  );
}

const StyledTransactionButton = styled.button`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: justify;
  margin: 20px 9px 9px 9px;
  background-color: #a328d6;
  padding: 15px;
  border: none;
  border-radius: 5px;
  height: 114px;
  width: 155px;
  font-size: 17px;
  font-weight: 700;

  p {
    background-color: #a328d6;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const AddIcon = styled(CgAdd)`
  font-size: 20px;
  text-align: left;
`;

const SubtractIcon = styled(CgRemove)`
  font-size: 20px;
  text-align: left;
`;
