import "./App.css";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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

    apiRequest.get("/status").then((res) => {
      dispatch({ type: "SET_APP_STATUS", payload: res.data.isRunning });
      if (res.data.isRunning === true) {
        setCode("custom");
        return;
      } else {
        setCode(new URLSearchParams(window.location.search).get("code"));
        return;
      }
    });
  }, []);

  return (
    <Router>
      {!code ? (
        <Login />
      ) : (
        <div className="App">
          <Player code={code} />
        </div>
      )}
    </Router>
  );
}

export default App;
