import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/common/Spinner";
import { client } from "@/lib/api";
import { useNavigate } from "react-router";
import { setEmail, userCheck } from "@/redux/reducers/user";
import axios from "axios";

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  const sendAccessToken = async function (authObj) {
    let result = await client.post("/api/auth/kakao-login", {
      access_token: authObj.access_token,
    });
    if (result.data.redirectUrl === "/") {
      dispatch(userCheck());
    } else if (result.data.redirectUrl === "/step1") {
      console.log(result.data);
      dispatch(setEmail(result.data.user_email));
      navigate("/step1");
    }
  };

  function requestToken(code) {
    const JS_APP_KEY = "42f138356c44e8bdcbcae522929a5117";
    const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
    const makeFormData = (params) => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
      });

      return searchParams;
    };

    axios({
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      url: "https://kauth.kakao.com/oauth/token",
      data: makeFormData({
        grant_type: "authorization_code",
        client_id: JS_APP_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    }).then((res) => {
      sendAccessToken(res.data);
    });
  }
  useEffect(() => {
    requestToken(code);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("로컬스토리지가 작동 안해요.");
      }
    }
  }, [user]);

  return (
    <>
      <Spinner />
    </>
  );
};

export default KakaoRedirect;
