import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext.jsx";
import AuthButton from "../components/Buttons/authButtons/AuthButton.jsx";
import MOTD from "../components/MOTD.jsx";
import AuthInput from "../components/Inputs/AuthInput.jsx";
import Form from "../components/Form/Form.jsx";
import LOGO from "../components/LOGO.jsx";
import { authAPI } from "../api/auth/authAPI.js";
import LoginPage from "../components/LoginPageLayout.jsx";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { auth, loginAuth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    const body = {
      email: email.current.value,
      password: password.current.value,
    };
    setDisabled(true);
    authAPI
      .login(body)
      .then((res) => {
        loginAuth(res.data);
        setAuth(res.data);
        navigate("/home");
      })
      .catch((err) => {
        setDisabled(false);
        alert(`${err.response.data}`);
      });
  }

  return (
    <LoginPage>
      <LOGO />
      <Form func={login}>
        <AuthInput
          disabled={disabled}
          type="email"
          ref={email}
          name="email"
          placeholder="E-Mail"
          required
        ></AuthInput>
        <AuthInput
          disabled={disabled}
          type={showPassword ? "text" : "password"}
          setShowPassword={setShowPassword}
          ref={password}
          name="password"
          placeholder="Password"
          required
        ></AuthInput>
        <AuthButton
          disabled={disabled}
          action={"Log In"}
          loading={"Login In..."}
        />
      </Form>
      {disabled ? null : (
        <MOTD
          navigate={() => navigate("/sign-up")}
          text={"New here? Sign up!"}
        />
      )}
    </LoginPage>
  );
};

export default Login;
