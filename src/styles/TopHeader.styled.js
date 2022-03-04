import styled from "styled-components";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh;
  padding: 10px 20px;
  padding-bottom: 0.5em;
  background-color: #6b0f1a;
  background-image: linear-gradient(315deg, #6b0f1a 0%, #b91372 74%);
`;

const NavBtn = styled(IconButton)`
  && {
    margin-right: 0.75rem;
    color: whitesmoke;
    box-shadow: 0px 1px 1px 2px whitesmoke;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: black;
      background-color: whitesmoke;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 90%;
  margin-right: 1.5rem;
  padding: 5px;
  color: whitesmoke;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    outline: 2px solid ${(props) => props.theme.colors.colorSecondary};
    color: white;
    transition: all 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-radius: 25px;
  height: 40px;
  width: 40%;
  margin: 10px 50px;
  margin-right: auto;
  padding-left: 1em;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: 3px solid ${(props) => props.theme.colors.colorSecondary};
    outline-offset: 4px;
    transition: outline-color 0.3s ease-out;
  }
`;

const LibaryLink = styled(NavLink)`
  position: relative;
  display: block;
  width: 60px;
  margin-left: 2rem;
  padding: 0.5em 1em;
  border-radius: 1rem;
  color: inherit;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize 
  font-weight: 700;
  transition: background-color 0.2s ease-in-out;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => props.theme.colors.colorSecondary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &.active {
    color: black;
    font-weight: 900;
  }
`;

export { Container, NavBtn, UserInfo, Input, LibaryLink };
