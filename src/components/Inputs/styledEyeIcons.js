import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import styled from "styled-components";

export const StyledEyeIcon = styled(HiOutlineEye)`
  position: absolute;
  translate: ${props => props.name === "password" ? "450% 0%" : "450% 230%"};
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledEyeOffIcon = styled(HiOutlineEyeOff)`
  position: absolute;
  translate: ${props => props.name === "password" ? "450% 0%" : "450% 230%"};
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`;
