import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 5px 10px;
  height: 60px;
  background-color: red;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding-top: 5px;
    padding-right: 20px;
  }
`;

const Controls = styled.div`
display: flex;
gap: 280px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0%);
  color: black;
  font-size: 1.5em;
  font-weight: 900;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const CurrentTime = styled.span`
  left: 40%;
`;
const TotalTime = styled.span`
  left: 60%;
`;

export { Container, Controls, CurrentTime, TotalTime };
