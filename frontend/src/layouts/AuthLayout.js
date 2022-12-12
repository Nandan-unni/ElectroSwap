import React, { useEffect, useState } from "react";
import router from "next/router";
import { useDispatch } from "react-redux";
import { routes } from "../routes";
import { message, Row, Spin } from "antd";
import { authActions } from "../redux/auth";
import { Cache } from "../../infrastructure/common/cache";

const AuthLayout = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();
  const publicRoutes = [routes.SIGNUP, routes.SIGNIN, routes.INITIAL];

  const stopLoading = () => setTimeout(() => setIsAuthenticating(false), 1000);

  useEffect(() => {
    const hasAccessToken = Cache.checkItem("accessToken");
    if (hasAccessToken && publicRoutes.includes(router.pathname)) {
      router.push(routes.HOME);
    } else if (!hasAccessToken && !publicRoutes.includes(router.pathname)) {
      message.config({ maxCount: 1 });
      message.warn("Login to continue!");
      router.push(routes.INITIAL);
    } else {
      console.log({ userl: Cache.getItem("user") });
      dispatch(authActions.handleSetUser(Cache.getItem("user")));
    }
    stopLoading();
  }, []);

  if (isAuthenticating)
    return (
      <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
        <Spin tip="Authenticating..." />
      </Row>
    );
  return children;
};

export default AuthLayout;
