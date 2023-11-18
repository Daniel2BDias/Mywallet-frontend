import StyledForm from "./formStyles.js"

export default function Form ({ children, func }) {
    return (
        <StyledForm id={"authForm"} onSubmit={func}>{children}</StyledForm>
    )
};