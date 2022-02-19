import { Button } from "@mui/material";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Image = styled.img`
  height: 200px;
  object-fit: contain;
  margin-bottom: 30px;
`;

const BtnStyles = css`
  width: 200px;
  height: 50px;
  color: whitesmoke;
  background-color: aquamarine;
  font-weight: 900;
  border: none;
  outline: none;

  &:focus {
    outline: 7px solid pink;
    outline-offset: 4px;
  }
`;

const LoginBtn = styled(Button)`
  && {
    ${BtnStyles}
  }
`;

const CodeBtn = styled(Button)`
  && {
    ${BtnStyles}
    margin-top: 50px;
    background-color: purple;
  }
`;


export {
    Container,
    Image,
LoginBtn,
CodeBtn,
}