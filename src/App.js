import "./App.css";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { AppContainer } from "./styles/Global.styled";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import Login from "./components/Login";
import Player from "./components/Player";
import { spotifyAPI, getUrlToken } from "./spotify";
import { apiRequest } from "./requests";

function App() {
  const [code, setCode] = useState(null);
  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    console.log("preFIRE");

    apiRequest.get("/status").then((res) => {
      console.log("gettin STATUS");
      dispatch({ type: "SET_APP_STATUS", payload: res.data.isRunning });
      if (res.data.isRunning === true) {
        console.log("setting custom");

        setCode("custom");
        return;
      } else {
        console.log("setting normal");

        setCode(new URLSearchParams(window.location.search).get("code"));
        return;
      }
    });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {!code ? (
          <Login />
        ) : (
          <AppContainer>
            <Player code={code} />
          </AppContainer>
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
