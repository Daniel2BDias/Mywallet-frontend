import styled from "styled-components";

export default function Reg () {
    return (
        <StyledReg>
            There are not any <br />
             registered entries
        </StyledReg>
    );
};

const StyledReg = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #868686;
  font-size: 20px;
  text-align: center;
`;