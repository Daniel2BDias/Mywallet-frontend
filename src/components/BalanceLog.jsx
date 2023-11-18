import styled from "styled-components"

export default function Balance ({ balance }) {
    return (
        <StyledBalance color={balance.prop}>
              <span>Balance</span>
              <p>{balance.amount}</p>
            </StyledBalance>
    )
};

const StyledBalance = styled.div`
  box-sizing: border-box;
  width: 95%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px 15px 1px 10px;

  span,
  p {
    background-color: white;
    box-sizing: border-box;
  }

  span {
    font-size: 17px;
    font-weight: 700;
  }

  p {
    color: ${(props) =>
      props.color > 0 ? "#03AC00" : props.color === 0 ? "000000" : "#C70000"};
  }
`;