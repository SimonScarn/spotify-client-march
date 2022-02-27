import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  background-color: black;
  color: #eee;

  & > hr {
    background-color: grey;
    width: 90%;
    opacity: 0.7;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  transition: 0.2s color ease-in;

  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }

  & > p {
    margin-left: 10px;
  }
`;
const Toolbar = styled.div`
  visibility: hidden;
  text-align: center;
  background: whitesmoke;
  color: black;
  border-radius: 1rem;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const SearchSection = styled.div`
  margin-top: 5px;
  padding: 15px 0 5px 0;
  border-top: 1px solid whitesmoke;
  
`;

const Input = styled.input`
  display: block;
  height: 25px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 6px;
  border-radius: 1rem;
  border: none;
  box-shadow: rgb(24, 29, 34) 0px 20px 30px -10px;
  background-color: rgb(153, 202, 173);
  font-weight: 700;
  color: black;


  &:focus {
    background-color: ${(props) => props.theme.colors.colorSecondary};
    outline: 2px solid aqua;
    transition: all 0.2s linear;
  }
`;

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    color: ${props => props.theme.colors.colorPrimary};
    font-weight: 900;
}
`;

const PlaylistContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 70px;
  overflow-y: auto;
`;

const PlaylistItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 0.5em 1em;
  transition: color 0.2s linear;

  &:hover {
    color: rgb(164, 109, 200);
  }

  &:hover ${Toolbar} {
    visibility: visible;
  }

  & > p {
    margin: 0;
    padding: 0;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export {
  Container,
  OptionContainer,
  Toolbar,
  SearchSection,
  Input,
  SidebarLink,
  PlaylistContainer,
  PlaylistItem,
};
