import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  grid-template-rows: 0.5fr 6fr;
  width: 40%;
  height: 80%;
  padding: 30px;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(55deg, #000000 0%, #202020 74%);
  border-radius: 10px;
`;

const Input = styled.input`
  margin: 0.75rem 0.25rem 0.5rem 0.25rem;
  padding: 10px 15px;
  border: none;
  outline: none;
  border-radius: 1rem;

  &:focus {
    outline: 3px solid black;
  }
`;

const Body = styled.div`
  width: 100%;
  overflow: hidden;

  h2 {
    margin-left: 30px;
    color: white;
  }
`;
const ListContainer = styled.div`
  height: 80%;
  padding: 1em;
  overflow-y: scroll;
`;
export { Container, Input, Body, ListContainer };
