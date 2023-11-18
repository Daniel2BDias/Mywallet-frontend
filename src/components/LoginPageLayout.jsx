import styled from "styled-components";

export default function LoginPage({ children }) {
  return <LoginPageWrapper>{children}</LoginPageWrapper>;
}

const LoginPageWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center:
align-items: center;
`;
