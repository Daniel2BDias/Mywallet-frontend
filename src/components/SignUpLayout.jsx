import styled from "styled-components";

export default function SignUpPage ({ children }) {
  return <SignUpPageWrapper>{children}</SignUpPageWrapper>
};

const SignUpPageWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center:
align-items: center;
`;