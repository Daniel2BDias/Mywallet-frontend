import StyledAuthButton from "./authButtonStyles.js";

export default function AuthButton({ disabled, action, loading }) {
  return (
    <StyledAuthButton disabled={disabled} type="submit">
      {disabled ? loading : action}
    </StyledAuthButton>
  );
};
