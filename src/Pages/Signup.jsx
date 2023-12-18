import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth/authAPI";
import LOGO from "../components/LOGO";
import AuthInput from "../components/Inputs/AuthInput";
import AuthButton from "../components/Buttons/authButtons/AuthButton";
import Form from "../components/Form/Form";
import MOTD from "../components/MOTD";
import SignUpPage from "../components/SignUpLayout";

export default function SignUp () {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function signup(e) {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      return alert(
        "Please, check if both, password and confirmation, are the same!"
      );
    }

    setDisabled(true);

    const body = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };

    const promise = authAPI.signUp(body);
    promise.then(() => navigate("/"));
    promise.catch(
      (err) => { alert(`${err.response.data}`);
      setDisabled(false);
      name.current.value = "";
      email.current.value = "";
      password.current.value = "";
      confirmPassword.current.value = "";
    }
    );
  }

  const navigate = useNavigate();
  return (
    <SignUpPage>
      <LOGO />
      <Form func={signup}>
        <AuthInput
          type="text"
          name="name"
          ref={name}
          placeholder="User name"
          required
        />
        <AuthInput
          type="email"
          name="email"
          ref={email}
          placeholder="E-Mail"
          required
        />
        <AuthInput
          type={showPassword ? "text" : "password"}
          setShowPassword={setShowPassword}
          name="password"
          ref={password}
          placeholder="Password"
          required
        />
        <AuthInput
          type={showConfirmPassword ? "text" : "password"}
          setShowConfirmPassword={setShowConfirmPassword}
          name="confirm"
          ref={confirmPassword}
          placeholder="Confirm your password"
          required
        />
        <AuthButton
          disabled={disabled}
          loading={"Signin Up..."}
          action={"Sign Up"}
          type="submit"
        />
      </Form>
      {disabled ? null : (
        <MOTD
          navigate={() => navigate("/")}
          text={"Already Registered? Log In!"}
        />
      )}
    </SignUpPage>
  );
};
