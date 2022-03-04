import { Button } from "@mui/material";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.bgMain};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    padding: 100px 120px;
    background: white;
    border-radius: 20px;
    background: ${(props) => props.theme.colors.bgHeader};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }

  h2 {
    color: whitesmoke;
  }
`;

const Image = styled.img`
  height: 200px;
  object-fit: contain;
  margin-bottom: 30px;
  padding: 5px;
  background: ${(props) => props.theme.colors.colorSecondary};
  outline: 5px solid ${(props) => props.theme.colors.colorSecondary};
  outline-offset: -7px;
  border-radius: 50%;
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
    outline: 2px solid pink;
    outline-offset: 4px;
  }

  &:hover {
    transition: all 0.3s linear;
    background: whitesmoke;
    color: black;
  }
`;

const LoginBtn = styled(Button)`
  && {
    ${BtnStyles}
    background: ${(props) => props.theme.colors.bgMain};
  }
`;

const CodeBtn = styled(Button)`
  && {
    ${BtnStyles}
    margin-top: 50px;
    background: ${(props) => props.theme.colors.colorSecondary};
  }
`;

export { Container, Image, LoginBtn, CodeBtn };
