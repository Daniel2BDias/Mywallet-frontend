import { forwardRef, useState } from "react"
import StyledAuthInput from "./inputStyles.js";
import { StyledEyeIcon, StyledEyeOffIcon } from "./styledEyeIcons.js";
import styled from "styled-components";

export default forwardRef(function AuthInput ({ disabled, type, name, placeholder, setShowPassword, setShowConfirmPassword }, ref) {
    function showPassword () {
       if(type === "password" && name === "password"){
        setShowPassword(true);
       } else {
        setShowPassword(false);
       };
    };

    function showConfirmPassword () {
      if(type === "password" && name === "confirm"){
          setShowConfirmPassword(true);
      } else {
          setShowConfirmPassword(false);
      };
    };

    return (
        <>
        <StyledAuthInput
          disabled={disabled}
          autoComplete="true"
          ref={ref}
          type={type}
          min={type === "number" ? "0" : null}
          step={type === "number" ? "0.01" : null}
          name={name}
          placeholder={placeholder}
          value={forwardRef.current?.value}
          required
          ></StyledAuthInput>
          {type === "password" && name === "password" ? <StyledEyeOffIcon name={name} onClick={showPassword}/> : type === "text" && name === "password" ? <StyledEyeIcon name={name}onClick={showPassword}/> : null}
          {type === "password" && name === "confirm" ? <StyledEyeOffIcon name={name} onClick={showConfirmPassword}/> : type === "text" && name === "confirm" ? <StyledEyeIcon name={name} onClick={showConfirmPassword}/> : null}
        </>
    );
});