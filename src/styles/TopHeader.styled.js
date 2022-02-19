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
  border-bottom-left-radius: 1rem;
  background-color: #6b0f1a;
  background-image: linear-gradient(315deg, #6b0f1a 0%, #b91372 74%);
`;


const NavBtn = styled(IconButton)`
  margin-right: 0.75rem;
  color: whitesmoke;
  box-shadow: 0px 1px 1px 2px aqua;
  transition: color, background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: pink;
    background-color: aqua;
    box-shadow: 0px 1px 1px 0.7px pink;
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
  transition: background 0.4s ease-in-out;

  &:hover {
    cursor: pointer;
    outline: 4px solid aqua;
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
  transition: background 0.4s ease-in-out;

  &:focus {
    outline: 3px solid aqua;
    outline-offset: 4px;
    transition: outline-color 0.3s ease-out;
  }
`;

const LibaryLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: inherit;
  margin-left: 2rem;
  padding: 0.5em 1em;
  border-radius: 1rem;
  color: white
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
    background-color: aqua;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &.active {
    color: aqua;
  }
`;

export { Container, NavBtn, UserInfo, Input, LibaryLink };

/*  
  
  
  .topHeader__navLink--selected .topHeader__navLink {
    padding: 50px;
  } */
