import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: repeat(auto-fill, 100px);
  margin: 5px;
  cursor: pointer;
  border-radius: 5rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: -1;
    background-color: lightgrey;
    transition: 0.3s ease-in;
  }

  &:hover:before {
    background-color: white;
  }
`;

const Image = styled.img`
  height: 80%;
  width: 80%;
  object-fit: cover;
  margin: auto;
`;

const Title = styled.h3`
  font-style: italic;
`;

export { Container, Image, Title };
