import { useContext } from "react";
import {Container,  Controls, CurrentTime, TotalTime } from "../styles/Footer.styled";
import FooterPlayer from "./SpotifyPlayer";
import { GlobalContext } from "../GlobalContext";

export default function Footer() {
  const { userInfo, dispatch } = useContext(GlobalContext);

  return (
    <Container>
      <FooterPlayer />
      <Controls>
        <CurrentTime>0:00</CurrentTime>
        <TotalTime>3:33</TotalTime>
      </Controls>
    </Container>
  );
}
