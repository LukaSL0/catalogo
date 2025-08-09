import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from './components/Login';
import Api from "./Api";

const ProtectedRoute = (): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        await Api.get("/auth");
        setIsAuth(true);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Auth error:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
        localStorage.removeItem('_token');
        setIsAuth(false);
      }
    };
    fetchAuthStatus();
  }, []);

  if (!isAuth) {
    return <Login />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;