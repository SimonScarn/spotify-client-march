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
    color: grey;
    cursor: pointer;
    transform: scale(1.04);

    & > p {
      margin-left: 10px;
    }
  }
`;
const Toolbar = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
`;

const SearchSection = styled.div`
  margin-top: 5px;
`;

const Input = styled.input`
  display: block;
  height: 25px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border: none;
  box-shadow: rgb(24, 29, 34) 0px 20px 30px -10px;
  background-color: rgb(153, 202, 173);
  font-weight: 700;

  &:focus {
    background-color: pink;
    outline: 2px solid aqua;
    transition: background-color 0.2s linear;
  }
`;

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    color: black;
    background: whitesmoke;
  }
`;

const PlaylistContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 70px;
  overflow-y: auto;
  border-top: 1px solid whitesmoke;
`;

const PlaylistItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 0.5em 1em;
  transition: color 0.2s linear;

  &:hover {
    color: rgb(164, 109, 200);
  }

  & > p {
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

/* .icon__sidebar {
  visibility: hidden;
}

.sidebar__playlist:hover .icon__sidebar {
  visibility: visible;
  cursor: pointer;
}


.icon__sidebar:hover {
  color: #6b0f1a !important;
} */
