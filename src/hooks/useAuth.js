import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./../GlobalContext";
import { apiRequest } from "../requests";

export default function useAuth(code) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);





  useEffect(() => {
    if (code === "custom") {
      apiRequest.get("/token").then((res) => {
        dispatch({ type: "SET_ACCESS_TOKEN", payload: res.data.accessToken });
        dispatch({
          type: "SET_REFRESH_TOKEN",
          payload: res.data.refreshToken,
        });

        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(3600);
      }); 
    } else {
      apiRequest
        .post("/login", {
          code: code,
        })
        .then((res) => {
          dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: res.data.accessToken,
          });
          dispatch({
            type: "SET_REFRESH_TOKEN",
            payload: res.data.refreshToken,
          });
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(3600);
          window.history.pushState({}, null, "/");
           return apiRequest.put("/token", {
            userId: "305",
            code: code,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }); 
        })
        .catch((err) => {
          console.error(err);
          window.location = "/";
        });
    }
  }, [code]);

  //!2121212121

  useEffect(() => {
    if (!refreshToken || !expiresIn) return; 
    const interval = setInterval(() => {
      apiRequest
        .post("/refresh", {
          refreshToken: refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(3600);
        /*   return apiRequest.put("/token", {
            accessToken: res.data.accessToken,
          }); */
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
