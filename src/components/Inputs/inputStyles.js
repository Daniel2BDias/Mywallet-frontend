import styled from "styled-components";

const StyledAuthInput = styled.input`
    position: relative;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    width: 326px;
    height: 50px;
    font-size: 20px;
    box-sizing: border-box;

    @media (max-width: 280px) {
      width: 96%;
    }

    &::placeholder {
    color: #000000;
    font-size: 20px;
  }
`;

export default StyledAuthInput;