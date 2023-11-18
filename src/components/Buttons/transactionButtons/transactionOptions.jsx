import styled from "styled-components";

export default function Options ({ children }) {
    return (
        <StyledOptions>{children}</StyledOptions>
    );
};

const StyledOptions = styled.div`
    display: flex;
`;